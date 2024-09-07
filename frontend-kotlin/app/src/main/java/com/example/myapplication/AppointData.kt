package com.example.myapplication

import android.os.Parcel
import android.os.Parcelable

data class AppointData(var appointId: Int, var appointDate: String, var appointTime: String, var requestStatus: String) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readInt()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!
    ) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeInt(appointId)
        parcel.writeString(appointDate)
        parcel.writeString(appointTime)
        parcel.writeString(requestStatus)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<AppointData> {
        override fun createFromParcel(parcel: Parcel): AppointData {
            return AppointData(parcel)
        }

        override fun newArray(size: Int): Array<AppointData?> {
            return arrayOfNulls(size)
        }
    }
}
