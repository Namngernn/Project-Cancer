package com.example.myapplication

import android.os.Parcel
import android.os.Parcelable

data class BloodData(var treatmentId: Int, var cancer: String, var formulaName: String) :
    Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readInt()!!,
        parcel.readString()!!,
        parcel.readString()!!
    ) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeInt(treatmentId)
        parcel.writeString(cancer)
        parcel.writeString(formulaName)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<BloodData> {
        override fun createFromParcel(parcel: Parcel): BloodData {
            return BloodData(parcel)
        }

        override fun newArray(size: Int): Array<BloodData?> {
            return arrayOfNulls(size)
        }
    }
}