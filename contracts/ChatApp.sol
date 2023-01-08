// SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0 < 0.9.0;

contract ChatApp {
    // USER STRUCT

    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct allUsersStruct {
        string name;
        address accountAddress;
    }

    allUsersStruct[] getAllUsers;

    // MAPPINGS
    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    // Check if user exists
    function checkUserExists(address _pubkey) public view returns (bool){
        return bytes(userList[_pubkey].name).length > 0;
    }

    // Create Account
    function createAccount(string calldata name) external {
        require(!checkUserExists(msg.sender), "User already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        userList[msg.sender].name = name;

        getAllUsers.push(allUsersStruct(name, msg.sender));
    }

    // Get UserName
    function getUserName(address _pubkey) external view returns (string memory) {
        require(checkUserExists(_pubkey), "User does not exist");
        return userList[_pubkey].name;
    }

    // Add Friends
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Please create an account first");
        require(checkUserExists(friend_key), "Friend does not exist");
        require(msg.sender != friend_key, "You cannot add yourself as a friend");
        require(checkAlreadyFriend(msg.sender, friend_key) == false, "You are already friends");
        
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }
    // check if already friends
    function checkAlreadyFriend(address _pubkey, address friend_key) internal view returns (bool) {
        for(uint i = 0; i < userList[_pubkey].friendList.length; i++) {
            if(userList[_pubkey].friendList[i].pubkey == friend_key) {
                return true;
            }
        }
        return false;
    }

    // Add Friend
    function _addFriend(address _pubkey, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[_pubkey].friendList.push(newFriend);
    }

    // Get Friend List
    function getFriendList(address _pubkey) external view returns (friend[] memory) {
        require(checkUserExists(_pubkey), "User does not exist");
        return userList[_pubkey].friendList;
    }

    // Get Chat Code
    function _getChatCode(address _pubkey, address friend_key) internal pure returns (bytes32) {
        if (_pubkey < friend_key) {
            return keccak256(abi.encodePacked(_pubkey, friend_key));
        } else {
            return keccak256(abi.encodePacked(friend_key, _pubkey));
        }
    }

    // Send Message
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Please create an account first");
        require(checkUserExists(friend_key), "Friend does not exist");
        require(checkAlreadyFriend(msg.sender, friend_key), "You are not friends with this user");
        require(bytes(_msg).length > 0, "Message cannot be empty");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }

    // Read Message
    function readMessage(address friend_key) external view returns (message[] memory) {
        require(checkUserExists(msg.sender), "Please create an account first");
        require(checkUserExists(friend_key), "Friend does not exist");
        require(checkAlreadyFriend(msg.sender, friend_key), "You are not friends with this user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    // Get All Users
    function getAllUsersFunc() external view returns (allUsersStruct[] memory) {
        return getAllUsers;
    }
}