package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Suppress("DEPRECATION")
class Appoint : AppCompatActivity() {
    private val TAG : String = "CHECK_RESPONSE"
    lateinit var HN:String
    private lateinit var appointAdapter: AdapterClass
    private lateinit var recyclerView: RecyclerView
    private var dataList: ArrayList<AppointData> = arrayListOf<AppointData>()
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private lateinit var page: CardView
    private lateinit var status:TextView


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.appoint)
        recyclerView = findViewById(R.id.recycleView)
        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()

        getAppointment()
        getInfoPatient()


        //callApi(recyclerView)



        var button4 = findViewById<Button> (R.id.button5)
        button4.setOnClickListener {
            var intent4 = Intent (this, HomePage::class.java)
            intent4.putExtra("HN", HN)
            startActivity(intent4)
        }

        var button7 = findViewById<Button> (R.id.button7)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            intent7.putExtra("HN", HN)
            startActivity(intent7)
        }

        var contact = findViewById<Button> (R.id.contact)
        contact.setOnClickListener {
            var intent = Intent (this, ContactHospital::class.java)
            intent.putExtra("HN", HN)
            startActivity(intent)
        }

        /*var button6 = findViewById<Button> (R.id.button6)
        button6.setOnClickListener {
            var intent6 = Intent (this, AppointInfo::class.java)
            startActivity(intent6)
        }*/

        /*var button7 = findViewById<Button> (R.id.button7)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            startActivity(intent7)
        }*/
    }

    /*private fun callApi(recyclerView: RecyclerView) {
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getAppointment(HN).enqueue(object: Callback<ArrayList<AppointData>> {
            override fun onResponse(
                call: Call<ArrayList<AppointData>>,
                response: Response<ArrayList<AppointData>>
            ) {
                if (response.isSuccessful){
                    val appointList = callData(response)
                    val adapterClass = AdapterClass(){appointData ->
                        val sendDataIntent = Intent(this@Appoint, EditAppoint::class.java).apply {
                            putExtra("appointId", appointData.appointId)
                            putExtra("appointDate", appointData.appointDate)
                            putExtra("appointTime", appointData.appointTime)
                        }
                        startActivity(sendDataIntent)
                        Log.d("testtest", sendDataIntent.toString())
                    }
                    //startActivity(sendDataIntent)
                    //recyclerView.adapter = adapterClass
                    //adapterClass.submitList(appointList)
                    }
                }

            override fun onFailure(call: Call<ArrayList<AppointData>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }

        })







    }

    private fun callData(response: Response<ArrayList<AppointData>>): ArrayList<AppointData> {
        val responseArray = JSONArray(response)
        val appointList = arrayListOf<AppointData>()

        for (index in 0 until responseArray.length()) {
            val appointObj = responseArray.getJSONObject(index)

            val appoint = AppointData(
                appointObj.getInt("appointId"),
                appointObj.getString("appointDate"),
                appointObj.getString("appointTime")
            )
            appointList.add(appoint)
        }
        return appointList
    }*/

    fun getAppointment(){
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getAppointment(HN).enqueue(object: Callback<ArrayList<AppointData>> {
            override fun onResponse(
                call: Call<ArrayList<AppointData>>,
                response: Response<ArrayList<AppointData>>
            ) {
                if (response.isSuccessful){
                    recyclerView = findViewById<RecyclerView?>(R.id.recycleView).apply {
                        response.body()?.let {
                            for (a in it.indices){
                                Log.d("index", a.toString())
                            }
                            for (i in it){
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
                                if (i.requestStatus == null) {
                                    i.requestStatus = ""
                                }
                                /*if (i.requestStatus == "เลื่อนนัดหมายสำเร็จ") {
                                    status.setTextColor(1)
                                }*/
                                //button22.text = date.plus(" ").plus(hour.plus(":").plus(minute))
                                var time = split[1].split(":")
                                var hour = time[0]
                                var minute = time[1]
                                if (hour.toInt() + 7 >= 24){
                                    hour = hour.toInt().mod(24).toString()
                                }else{
                                    hour = (hour.toInt() + 7).toString()
                                }

                                val dataClass = AppointData(i.appointId, day.plus(" ").plus(month).plus(" ").plus(year.toString()), hour.plus(":").plus(minute), i.requestStatus)
                                dataList.add(dataClass)
                                Log.d("datalist", dataList.toString())

                                /*var intent = Intent(this@Appoint, AppointInfo::class.java)
                                intent.putExtra("appointDate", date)
                                intent.putExtra("appointTime", hour.plus(":").plus(minute))
                                Log.d("put extra", intent.toString())*/


                                /*var intent = Intent(this@Appoint, AppointInfo::class.java)
                                appointDate.setOnClickListener{
                                    intent.putExtra("appointDate", dataList)
                                    startActivity(intent)
                                    Log.d("put extra", intent.toString())
                                }*/
                            }
                        }
                    }
                    appointAdapter = AdapterClass(dataList)
                    recyclerView.adapter = appointAdapter
                    recyclerView.layoutManager = LinearLayoutManager(this@Appoint)
                    recyclerView.setHasFixedSize(true)

                    //val para = callData(dataList)
                    /*recyclerView.adapter = adapterClass
                    adapterClass.submitList(para)
                    Log.d("test", adapterClass.toString())*/
                    appointAdapter.onItemClick = {
                        val intent = Intent(this@Appoint, AppointInfo::class.java)
                        intent.putExtra("appointId", it.appointId.toString())
                        intent.putExtra("HN", HN)
                        startActivity(intent)
                    }

                }
            }
            override fun onFailure(call: Call<ArrayList<AppointData>>, t: Throwable) {
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

    /*private fun getData(){
        for (i in Appointment){
            val dataClass = AppointData(i.appointDate)
            dataList.add(dataClass)
            Log.d("appoint", i.toString())
        }
        recyclerView.adapter = AdapterClass(dataList)
    }*/
}