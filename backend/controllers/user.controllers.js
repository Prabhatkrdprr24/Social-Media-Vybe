import User from '../models/user.model.js';

export const getCurrentUser = async (req, res) => {

    try{

        const userId = req.userId;
        const user = await User.findById(userId);
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