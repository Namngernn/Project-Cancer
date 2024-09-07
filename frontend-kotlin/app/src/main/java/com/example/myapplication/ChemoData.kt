package com.example.myapplication

import android.os.Parcel
import android.os.Parcelable

data class ChemoData (
    var feedbackId: Int,
    var appointDate: String,
    var appointTime: String,
    var appoint_no: String,
    var appointId: Int
): Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readInt()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readInt()!!
    ) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeInt(feedbackId)
        parcel.writeString(appointDate)
        parcel.writeString(appointTime)
        parcel.writeString(appoint_no)
        parcel.writeInt(appointId)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ChemoData> {
        override fun createFromParcel(parcel: Parcel): ChemoData {
            return ChemoData(parcel)
        }

        override fun newArray(size: Int): Array<ChemoData?> {
            return arrayOfNulls(size)
        }
    }
}