import uploadOnCloudinary from '../config/cloudinary.js';
import User from '../models/user.model.js';

export const getCurrentUser = async (req, res) => {

    try{

        const userId = req.userId;
        const user = await User.findById(userId).populate("posts loops");
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    }
    catch(error){
        return res.status(500).json({ message: `getCurrentUser error ${error}` });
    }
}


export const suggestedUsers = async (req, res) => {

    try{

        const users = await User.find({
            _id: { $ne: req.userId } // Exclude the current user
        })
        .select("-password");

        console.log("Suggested Users: ", users);

        res.status(200).json(users);

    }
    catch(error){
        return res.status(500).json({ message: `suggestedUsers error ${error}` });
    }

}

export const editProfile = async (req, res) => {

    try{

        const { name, userName, bio, profession, gender } = req.body;
        console.log("Edit Profile Data: ", req.body);

        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const sameUserWithUserName = await User.findOne({ userName }).select("-password");

        if(sameUserWithUserName && sameUserWithUserName._id!=req.userId){
            return res.status(400).json({message:"userName already exist"})
        }

        let profileImage = user.profileImage;
        if(req.file){
            profileImage = await uploadOnCloudinary(req.file.path);
        }

        user.name = name;
        user.userName = userName;
        user.bio = bio;
        user.profession = profession
        user.gender= gender;
        user.profileImage = profileImage;

        await user.save();

        return res.status(200).json({ message: "Profile updated successfully", user });
    }
    catch(error){
        return res.status(500).json({ message: `editProfile error ${error}` });
    }
}

export const getProfile = async (req, res) => {

    try{

        const userName = req.params.userName;
        const user = await User.findOne({ userName }).select("-password")
            .populate("posts loops followers following");
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    }
    catch(error){
        return res.status(500).json({ message: `getProfile error ${error}` });
    }

}

export const follow = async (req, res) => {

    try{

        const currentUserId = req.userId;
        const targetUserId = req.params.targetUserId;
        console.log(currentUserId, targetUserId);

        if(!targetUserId){
            return res.status(400).json({ message: "target user is not found" });
        }

        if(currentUserId == targetUserId){
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        const isFollowing = currentUser.following.includes(targetUserId);
        if(isFollowing){
            currentUser.following = currentUser.following.filter(id => id.toString() != targetUserId.toString());
            targetUser.followers = targetUser.followers.filter(id => id.toString() != currentUserId.toString());

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({ 
                message: "Unfollowed successfully",
                following: false,
            });
        }
        else{
            currentUser.following.push(targetUserId);
            targetUser.followers.push(currentUserId);

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                message: "Followed successfully",
                following: true,
            });
        }
    }
    catch(error){
        return res.status(500).json({ message: `backend follow error ${error}` });
    }

}

