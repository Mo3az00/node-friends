const userProfile = new mongoose.Schema({
    user: mongoose.Schema.ObjectId,
    avatar: String,
    photo: String,
    bio: String,
    website: String    
})

module.exports = mongoose.model('UserProfile', userProfile)