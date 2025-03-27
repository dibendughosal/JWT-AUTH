const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: [true, 'Already registered'],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type:String,
        required: true
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiryDate: {
        type: Date
    }
}, {
    timestamps: true
});

userSchema.methods = {
    jwtToken(){
        return this.jwtToken.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {
                expiresIN: '24h'
            }
        )
    }
}

const userModel = mongoose.model('user', userSchema); 
module.exports = userModel;