package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Suppress("DEPRECATION")
class AppointInfo : AppCompatActivity() {
    private val TAG : String = "CHECK_RESPONSE"
    private lateinit var HN: String
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private lateinit var appointId :String
    private lateinit var appointDate: TextView
    private lateinit var appointTime: TextView
    private lateinit var name: TextView
    private lateinit var num: TextView
    private lateinit var requestStatus:TextView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.appointinfo)
        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()
        Log.d("HN top", HN)

        appointId = bundle?.getString("appointId").toString()
        appointDate= findViewById(R.id.appointDate)
        appointTime= findViewById(R.id.appointTime)
        name = findViewById(R.id.textView9)
        num = findViewById(R.id.textView7)
        requestStatus = findViewById(R.id.requestStatus)


        getInfoPatient()
        patientAppoint()

        //val appointDate: TextView = findViewById(R.id.appointDate)
        //val appointTime: TextView = findViewById(R.id.appointTime)

        /*val appointData = AppointData(
            intent.getIntExtra("appointId", 0),
            intent.getStringExtra("appointDate")!!,
            intent.getStringExtra("appointTime")!!
        )
        appointDate.text = appointData.appointDate
        appointTime.text = appointData.appointTime*/



        var button16 = findViewById<Button> (R.id.button16)
        button16.setOnClickListener {
            var intent16 = Intent (this, Appoint::class.java)
            intent16.putExtra("HN", HN)
            intent16.putExtra("appointId", appointId)
            Log.d("HN", HN)
            startActivity(intent16)
        }
        var button17 = findViewById<Button> (R.id.button17)
        button17.setOnClickListener {
            var intent17 = Intent (this, EditAppoint::class.java)
            intent17.putExtra("HN", HN)
            intent17.putExtra("appointId", appointId)
            startActivity(intent17)
        }
    }

    private fun patientAppoint(){
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.patientAppoint(appointId).enqueue(object : Callback<ArrayList<AppointInfoData>>{
            override fun onResponse(
                call: Call<ArrayList<AppointInfoData>>,
                response: Response<ArrayList<AppointInfoData>>
            ) {
                Log.d("res", response.toString()
                )
                if (response.isSuccessful){
                    response.body()?.let {
                        for (i in it){
                            if (i.requestStatus == null) {
                                i.requestStatus = ""
                            }
                            var split = i.appointDate.split("T")
                            var date = split[0]
                            var splitDate = date.split("-")
                            var year = splitDate[0].toInt() + 543
                            var day = splitDate[2]
                            var month = splitDate[1]
                            //var time = splitDate[1].split(":")
                            /*var hour = time[0]
                            var minute = time[1]
                            if (hour.toInt() + 7 >= 24){
                                hour = hour.toInt().mod(24).toString()
                            }else{
                                hour = (hour.toInt() + 7).toString()
                            }*/
                            //var allMonth = arrayOf("มกราคม", "กุมภาพันธุ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม")
                            //var allMonths = allMonth.toList()
                            if (month == "01") {
                                month = "มกราคม"
                            }
                            else if (month == "02") {
                                month = "กุมภาพันธ์"
                            }
                            else if (month == "03") {
                                month = "มีนาคม"
                            }
                            else if (month == "04") {
                                month = "เมษายน"
                            }
                            else if (month == "05") {
                                month = "พฤษภาคม"
                            }
                            else if (month == "06") {
                                month = "มิถุนายน"
                            }
                            else if (month == "07") {
                                month = "กรกฎาคม"
                            }
                            else if (month == "08") {
                                month = "สิงหาคม"
                            }
                            else if (month == "09") {
                                month = "กันยายน"
                            }
                            else if (month == "10") {
                                month = "ตุลาคม"
                            }
                            else if (month == "11") {
                                month = "พฤศจิกายน"
                            }
                            else {
                                month = "ธันวาคม"
                            }

                            if (day == "01") {
                                day = "1"
                            }
                            else if (day == "02") {
                                day = "2"
                            }
                            else if (day == "03") {
                                day = "3"
                            }
                            else if (day == "04") {
                                day = "4"
                            }
                            else if (day == "05") {
                                day = "5"
                            }
                            else if (day == "06") {
                                day = "6"
                            }
                            else if (day == "07") {
                                day = "7"
                            }
                            else if (day == "08") {
                                day = "8"
                            }
                            else if (day == "09") {
                                day = "9"
                            }
                            //button22.text = date.plus(" ").plus(hour.plus(":").plus(minute))
                            var time = split[1].split(":")
                            var hour = time[0]
                            var minute = time[1]
                            if (hour.toInt() + 7 >= 24){
                                hour = hour.toInt().mod(24).toString()
                            }else{
                                hour = (hour.toInt() + 7).toString()
                            }
                            if (i.requestStatus == null) {
                                i.requestStatus = ""
                            }
                            appointDate.text = day.plus(" ").plus(month).plus(" ").plus(year.toString())
                            appointTime.text = hour.plus(":").plus(minute)
                            name.text = i.firstName.plus(" ").plus(i.lastName)
                            num.text = HN
                            if (i.requestStatus == "เลื่อนนัดหมายสำเร็จ"){
                                requestStatus.text = i.requestStatus
                                requestStatus.setTextColor(Integer.parseUnsignedInt("FF3B9628",16))
                            }
                            else if (i.requestStatus == "รอดำเนินการเลื่อนนัดหมาย"){
                                requestStatus.text = i.requestStatus
                                requestStatus.setTextColor(Integer.parseUnsignedInt("FFB9BE25",16))
                            }
                            else if (i.requestStatus == "ไม่สามารถเลื่อนนัดหมายได้"){
                                requestStatus.text = i.requestStatus
                                requestStatus.setTextColor(Integer.parseUnsignedInt("FFB14127",16))
                            }

                            Log.d("info", i.toString())

                        }
                    }
                }
            }

            override fun onFailure(call: Call<ArrayList<AppointInfoData>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }

        })
    }

    private fun getInfoPatient(){
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getPatientInfo(HN).enqueue(object : Callback<ArrayList<InfoPatient>> {
            override fun onResponse(
                call: Call<ArrayList<InfoPatient>>,
                response: Response<ArrayList<InfoPatient>>
            ) {
                if (response.isSuccessful){
                    response.body()?.let {
                        for (i in it){
                            infoPatient?.addAll(listOf(i))
                        }
                    }
                    for (i in infoPatient){
                        HN = i.HN
                    }
                }
            }

            override fun onFailure(call: Call<ArrayList<InfoPatient>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }

        })
    }
}