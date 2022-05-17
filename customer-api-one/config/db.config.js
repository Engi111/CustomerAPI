const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URL
    },
    default :{
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb+srv://EK:engina@customerapi.fmja6.mongodb.net/CustomerAPI?retryWrites=true&w=majority'
    }
}