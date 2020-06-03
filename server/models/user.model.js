import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: 'Email already exist',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String,
    update: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    }
    );


userSchema.methods = {
    // create salt function
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },
    // Create cryptic password
    encryptPassword: function (password) {
        if (!password) { return }
        try {
            console.log(`password for username: ${this.name}. email: ${this.email} \n Error: ${this}`)
            const updatedPass = crypto.createHmac(password, this.salt)
                .update(password)
                .digest("hex");
            return updatedPass;
        } catch (encryptError) {
            console.log(`Encrypt error: for username: ${this.name}. email: ${this.email} \n Error: ${encryptError}`)
        }
    },
    // authenticate
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashed_password
    }
}

export default mongoose.model('User', userSchema);

