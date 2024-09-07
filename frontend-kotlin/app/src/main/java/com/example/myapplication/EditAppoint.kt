package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.DatePicker
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputEditText
import com.google.gson.JsonObject
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.Calendar
@Suppress("DEPRECATION")
class EditAppoint : AppCompatActivity() {
    private lateinit var email: TextInputEditText
    private lateinit var phone: TextInputEditText
    private lateinit var note: TextInputEditText
    private lateinit var date: DatePicker
    private lateinit var oldAppoint: TextView
    private val TAG : String = "CHECK_RESPONSE"
    lateinit var HN:String
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    lateinit var appointId: String
    lateinit var appointTime: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.edit_appointinfo)

        email = findViewById(R.id.emailEditText)
        phone = findViewById(R.id.phoneEditText)
        note = findViewById(R.id.noteEditText)
        date = findViewById(R.id.date)
        oldAppoint =findViewById(R.id.textView16)

        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()
        appointId = bundle?.getString("appointId").toString()


        getInfoPatient()
        patientAppoint()

        var button19 = findViewById<Button> (R.id.button19)
        button19.setOnClickListener {
            var intent19 = Intent (this, AppointInfo::class.java)
            intent19.putExtra("HN", HN)
            intent19.putExtra("appointId", appointId)
            startActivity(intent19)
        }

        /*var button21 = findViewById<Button>(R.id.button21)
        button21.setOnClickListener {
            patientPostpone()
            var intent21 = Intent (this, AppointInfo::class.java)
            startActivity(intent21)
        }*/
        //เลือกเวลา//
        /*val items = listOf("07.00 น.", "07.30 น.", "08.00 น.", "08.30 น.", "09.00 น.", "09.30 น.", "10.00 น.", "10.30 น.", "11.00 น.", "11.30 น.", "12.00 น.", "12.30 น.", "13.00 น.", "13.30 น.", "14.00 น.", "14.30 น.", "15.00 น.", "15.30 น.", "16.00 น.")

        val autoComplete: AutoCompleteTextView = findViewById(R.id.autoCompleteTextView2)

        val adapter = ArrayAdapter(this, R.layout.list_item, items)
        autoComplete.setAdapter(adapter)

        autoComplete.onItemClickListener = AdapterView.OnItemClickListener {
            adapterView, view, i, l ->

            val itemSelected = adapterView.getItemAtPosition(i)
            Toast.makeText(this, "Item: $itemSelected", Toast.LENGTH_SHORT).show()
        }*/


        //เลือกวัน//
        val datePi = findViewById<DatePicker>(R.id.date) as DatePicker

        val calendar: Calendar = Calendar.getInstance()

        datePi.init(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH))
            {view, year, momthOfYear, dayOfMonth ->
                Toast.makeText(applicationContext,
                    "#" + datePi.year + "-" + datePi.month + "-" + datePi.dayOfMonth + "/",
                    Toast.LENGTH_SHORT).show()
        }

        //ยืนยันการเลื่อนนัดหมาย//
        val btnAlert = findViewById<Button>(R.id.button21)

        btnAlert.setOnClickListener {
            val artDialogBuilder = AlertDialog.Builder(this@EditAppoint)

            artDialogBuilder.setMessage("คุณต้องการเลื่อนนัดใช่หรือไม่")
            artDialogBuilder.setTitle("ยืนยันการเลื่อนนัด")
            artDialogBuilder.setCancelable(false)
            artDialogBuilder.setPositiveButton("ตกลง") {_,_ ->
                patientPostpone()
                var intent21 = Intent (this, AppointInfo::class.java)
                intent21.putExtra("HN", HN)
                intent21.putExtra("appointId", appointId)
                startActivity(intent21)
            }
            artDialogBuilder.setNegativeButton("ยกเลิก") {_,_ ->
                Toast.makeText(this@EditAppoint, "ยกเลิกการดำเนินการ", Toast.LENGTH_SHORT).show()
            }
            artDialogBuilder.setNeutralButton("กลับ") {_,_ ->
                Toast.makeText(this@EditAppoint, "กลับหน้าเดิม", Toast.LENGTH_SHORT).show()
            }

            val alertDialogBox = artDialogBuilder.create()
            alertDialogBox.show()
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
                            appointTime = hour.plus(":").plus(minute).plus(":00")
                            oldAppoint.text = day.plus(" ").plus(month).plus(" ").plus(year.toString())


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

    private fun patientPostpone() {
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        val params = JsonObject().apply {
            addProperty("newAppointDate", date.year.toString().plus("-").plus(date.month.toString()).plus("-").plus(date.dayOfMonth.toString()).plus(" ").plus(appointTime))
            addProperty("reason", note.text.toString())
            addProperty("email", email.text.toString())
            addProperty("requestPhone", phone.text.toString())
        }
        val requestBody = RequestBody.create("application/json".toMediaTypeOrNull(), params.toString())
        retrofitService.patientPostpone(appointId, requestBody).enqueue(object : Callback<ArrayList<AppointInfoData>> {
            override fun onResponse(
                call: Call<ArrayList<AppointInfoData>>,
                response: Response<ArrayList<AppointInfoData>>
            ) {
                if (response.isSuccessful){
                    Log.d(TAG, "success")
                }
            }

            override fun onFailure(call: Call<ArrayList<AppointInfoData>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }

        })
    }
}