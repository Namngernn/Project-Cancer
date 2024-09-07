package com.example.myapplication

import com.google.gson.annotations.SerializedName

data class CommentItem (
    @SerializedName("userId")
    val userId : Int,

    @SerializedName("userName")
    val userName : String

)