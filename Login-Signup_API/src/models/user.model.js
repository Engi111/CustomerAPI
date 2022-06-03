//creating a model using mongoose scheme
//consist name email and password with min & max lengths with required
const mongoose = require("mongoose");
const Joi = require("joi");
const {v4 : uuidv4} = require("uuid");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        min: 4,
        max: 80,
    },
    email: {
        type: String,
        required: [true, "Please add your email"],
        min: 12,
        max: 80,
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        min: 8,
        max: 16,
    }, 
    // role: {
        //     type: String,
        //     required: true,
    //},     
    uuid: {
        type: String,
        default : () => uuidv4(),
    },
    deleted_at: {
        type: Date,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
        
    }
);

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};
//to encrypt password
// userSchema.pre("save", async function(next){
//     if(!this.isModefied("password")){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

//to validate users


// //to get records of the database
// exports.getUsers = async (req, res, next) => {
    //     try {
        //         const users = await userSchema.find();
        //         res.status(200).json({sucess:true, data: users})
//     } catch (error) {
    //         res.status(400).json({sucess: false})
    //     }
    // }
    
 const User = mongoose.model("User", userSchema); 
 module.exports = { User, validate};