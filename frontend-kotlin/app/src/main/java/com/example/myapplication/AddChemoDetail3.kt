package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.JsonObject
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Suppress("DEPRECATION")
class AddChemoDetail3  : AppCompatActivity() {
    private lateinit var check1: CheckBox
    private lateinit var check2: CheckBox
    private lateinit var check3: CheckBox
    private lateinit var check4: CheckBox
    private lateinit var check5: CheckBox
    private lateinit var check6: CheckBox
    private lateinit var check7: CheckBox
    private lateinit var check8: CheckBox
    private lateinit var record: Button
    private val TAG : String = "CHECK_RESPONSE"
    private lateinit var appointId :String
    lateinit var HN:String
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private lateinit var other: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.add_chemodetail3)

        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()
        appointId = bundle?.getString("appointId").toString()
        Log.d("appoint", appointId)


        getInfoPatient()

        var button11 = findViewById<Button> (R.id.button11)
        button11.setOnClickListener {
            var intent11 = Intent (this, Chemo::class.java)
            intent11.putExtra("HN", HN)
            startActivity(intent11)
        }

        var contact = findViewById<Button> (R.id.contact)
        contact.setOnClickListener {
            var intent = Intent (this, ContactHospital::class.java)
            intent.putExtra("HN", HN)
            startActivity(intent)
        }

        var button14 = findViewById<Button> (R.id.button14)
        button14.setOnClickListener {
            var intent14 = Intent (this, Chemo::class.java)
            intent14.putExtra("HN", HN)
            startActivity(intent14)
        }

        var button7 = findViewById<Button> (R.id.button7)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            intent7.putExtra("HN", HN)
            startActivity(intent7)
        }

        check1 = findViewById(R.id.checkBox)
        check2 = findViewById(R.id.checkBox2)
        check3 = findViewById(R.id.checkBox3)
        check4 = findViewById(R.id.checkBox4)
        check5 = findViewById(R.id.checkBox5)
        check6 = findViewById(R.id.checkBox6)
        check7 = findViewById(R.id.checkBox7)
        check8 = findViewById(R.id.checkBox8)
        record = findViewById(R.id.button15)

        record.setOnClickListener {
            val result = StringBuilder()
            if (check1.isChecked) {
                result.append("กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ ")
            }
            if (check2.isChecked) {
                result.append("เยื่อบุปากอักเสบ เกิดแผลร้อนในในปาก ")
            }
            if (check3.isChecked) {
                result.append("ผมร่วง / บางลง ")
            }
            if (check4.isChecked) {
                result.append("อ่อนเพลีย / ครั่นเนื้อครั่นตัว ")
            }
            if (check5.isChecked) {
                result.append("ผิวหนังสีเข้มขึ้น ")
            }
            if (check6.isChecked) {
                result.append("ใจสั่น / หอบเหนื่อยง่าย ")
            }
            if (check7.isChecked) {
                result.append("กระเพาะปัสสาวะอักเสบ ")
            }
            if (check8.isChecked) {
                other = findViewById(R.id.editTextTextMultiLine2)
                result.append(other.text)
            }

            val artDialogBuilder = AlertDialog.Builder(this@AddChemoDetail3)

            artDialogBuilder.setMessage("บันทึกผลข้างเคียงใช่หรือไม่")
            artDialogBuilder.setTitle("ยืนยันการบันทึก")
            artDialogBuilder.setCancelable(false)
            artDialogBuilder.setPositiveButton("ตกลง") {_,_ ->
                savePatientSideEffect(result)
//                val mSocket = IO.socket("http://10.50.8.3:8080")
//                if (!mSocket.connected()){
//                    mSocket.connect()
//                    mSocket.emit("CH03", HN)
//                }else if (mSocket.connected()){
//                    mSocket.emit("CH03", HN)
//                }
//                mSocket.disconnect()
                SocketHandler.setSocket()
                val mSocket = SocketHandler.getSocket()
                mSocket.connect()
                mSocket.emit("CH05", HN)
                val intent = Intent(this@AddChemoDetail3, Chemo::class.java)
                intent.putExtra("HN", HN)
                startActivity(intent)
            }
            artDialogBuilder.setNegativeButton("ยกเลิก") {_,_ ->
                Toast.makeText(this@AddChemoDetail3, "ยกเลิกการดำเนินการ", Toast.LENGTH_SHORT).show()
            }
            artDialogBuilder.setNeutralButton("กลับ") {_,_ ->
                Toast.makeText(this@AddChemoDetail3, "กลับหน้าเดิม", Toast.LENGTH_SHORT).show()
            }

            val alertDialogBox = artDialogBuilder.create()
            alertDialogBox.show()

            /*savePatientSideEffect(result)
            val intent = Intent(this@AddChemoDetail3, Chemo::class.java)
            intent.putExtra("HN", HN)
            startActivity(intent)*/
        }
    }

    private fun savePatientSideEffect(result: StringBuilder){
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        val params = JsonObject().apply {
            addProperty("patientSideEffect", result.toString())
        }
        Log.d("appoint test", appointId.toString())
        val requestBody = RequestBody.create("application/json".toMediaTypeOrNull(), params.toString())
        retrofitService.updateSideEffect(appointId, requestBody).enqueue(object : Callback<ChemoData> {
            override fun onResponse(call: Call<ChemoData>, response: Response<ChemoData>) {
                if (response.isSuccessful){
                    Toast.makeText(this@AddChemoDetail3, "บันทึกผลข้างเคียงเรียบร้อยแล้ว", Toast.LENGTH_LONG).show()
                    Log.d("res", response.toString())
                }
            }

            override fun onFailure(call: Call<ChemoData>, t: Throwable) {
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