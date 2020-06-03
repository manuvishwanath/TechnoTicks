

const dbGetErrorMessage = err => {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = "something went wrong";
                break;
        }
    }
}