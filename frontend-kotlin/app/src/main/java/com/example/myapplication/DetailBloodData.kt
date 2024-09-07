package com.example.myapplication

import android.os.Parcel
import android.os.Parcelable

data class DetailBloodData(var treatmentId: Int, var HN: String, var IDcard: String, var firstName: String, var lastName: String, var cancer: String,
    var formulaName: String, var picture: String, var status: String) :
    Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readInt()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!,
        parcel.readString()!!
    ) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeInt(treatmentId)
        parcel.writeString(HN)
        parcel.writeString(IDcard)
        parcel.writeString(firstName)
        parcel.writeString(lastName)
        parcel.writeString(cancer)
        parcel.writeString(formulaName)
        parcel.writeString(picture)
        parcel.writeString(status)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<DetailBloodData> {
        override fun createFromParcel(parcel: Parcel): DetailBloodData {
            return DetailBloodData(parcel)
        }

        override fun newArray(size: Int): Array<DetailBloodData?> {
            return arrayOfNulls(size)
        }
    }
}