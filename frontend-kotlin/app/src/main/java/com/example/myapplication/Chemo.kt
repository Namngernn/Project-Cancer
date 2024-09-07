package com.example.myapplication

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Build.VERSION_CODES
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class Chemo : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private val TAG : String = "CHECK_RESPONSE"
    private lateinit var HN: String
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private var dataList: ArrayList<ChemoData> = arrayListOf<ChemoData>()
    private lateinit var chemoAdapter: ChemoAdapter
    private lateinit var appointDate: TextView
    private lateinit var appoint_no: TextView

    val CHANNEL_ID = "pickerChannel"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.record_chemo)
        var button19 = findViewById<Button> (R.id.button19)
        recyclerView = findViewById(R.id.recycleViewChemo)
        //val bundle = intent.extras
        //HN = bundle?.getString("HN").toString()
        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()


        getDataChemo()
        getInfoPatient()
        button19.setOnClickListener {
            var intent19 = Intent (this, HomePage::class.java)
            intent19.putExtra("HN", HN)
            startActivity(intent19)
        }

        var button8 = findViewById<Button> (R.id.button8)
        button8.setOnClickListener {
            var intent8 = Intent (this, HomePage::class.java)
            intent8.putExtra("HN", HN)
            startActivity(intent8)
        }

        var contact = findViewById<Button> (R.id.contact)
        contact.setOnClickListener {
            var intent = Intent (this, ContactHospital::class.java)
            intent.putExtra("HN", HN)
            startActivity(intent)
        }

        /*var button24 = findViewById<Button> (R.id.button24)
        button24.setOnClickListener {
            var intent24 = Intent (this, ChemoDetail2::class.java)
            startActivity(intent24)
        }

        var button23 = findViewById<Button> (R.id.button23)
        button23.setOnClickListener {
            var intent23 = Intent (this, AddChemoDetail1::class.java)
            startActivity(intent23)
        }*/

        var button7 = findViewById<Button> (R.id.button8)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            intent7.putExtra("HN", HN)
            startActivity(intent7)
        }

        createNotificationChannel()
    }

    fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= VERSION_CODES.O) {
            val name = "channel_name"
            val descriptionText = "description"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
                description = descriptionText
            }

            val notificationManager: NotificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }


    fun getDataChemo(){
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getDataChemo(HN).enqueue(object: Callback<ArrayList<ChemoData>> {
            override fun onResponse(
                call: Call<ArrayList<ChemoData>>,
                response: Response<ArrayList<ChemoData>>
            ) {
                if (response.isSuccessful){
                    recyclerView = findViewById<RecyclerView?>(R.id.recycleViewChemo).apply {
                        Log.d("console app", response.toString())
                        response.body()?.let {
                            /*if (it == null) {
                                it.add(ChemoData(0, "", "", "", 0))
                            }*/
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
                                var time = split[1].split(":")
                                var hour = time[0]
                                var minute = time[1]
                                if (hour.toInt() + 7 >= 24){
                                    hour = hour.toInt().mod(24).toString()
                                }else{
                                    hour = (hour.toInt() + 7).toString()
                                }
                                val dataClass = ChemoData(i.feedbackId, day.plus(" ").plus(month).plus(" ").plus(year.toString()), hour.plus(":").plus(minute), i.appoint_no, i.appointId)
                                dataList.add(dataClass)
                                Log.d("test", dataList.toString())
                            }
                        }
                    }
                    chemoAdapter = ChemoAdapter(dataList)
                    recyclerView.adapter = chemoAdapter
                    recyclerView.layoutManager = LinearLayoutManager(this@Chemo)
                    recyclerView.setHasFixedSize(true)

                    chemoAdapter.onItemClick = {
                        val intent = Intent(this@Chemo, AddChemoDetail3::class.java)
                        intent.putExtra("appointId", it.appointId.toString())
                        intent.putExtra("HN", HN)
                        startActivity(intent)
                    }
                }
            }
            override fun onFailure(call: Call<ArrayList<ChemoData>>, t: Throwable) {
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

    /*fun runNotify(view: View) {
        var builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle("this is Title")
            .setContentText("this is content")
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)

        with(NotificationManagerCompat.from(this)) {
            notify(0, builder.build())
        }
    }*/
}