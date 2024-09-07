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

class AddChemoDetail1 : AppCompatActivity() {
    private lateinit var date: TextView
    private lateinit var formula: TextView
    private lateinit var medicineName: TextView
    private lateinit var unit: TextView
    private val TAG : String = "CHECK_RESPONSE"
    lateinit var HN:String
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.add_chemodetail1)

        date = findViewById(R.id.textView31)
        formula = findViewById(R.id.textView35)
        medicineName = findViewById(R.id.textView21)
        unit = findViewById(R.id.textView24)

        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()

        getInfoPatient()

        var button11 = findViewById<Button> (R.id.button11)
        button11.setOnClickListener {
            var intent11 = Intent (this, Chemo::class.java)
            startActivity(intent11)
        }

        var button18 = findViewById<Button> (R.id.button18)
        button18.setOnClickListener {
            var intent18 = Intent (this, AddChemoDetail3::class.java)
            startActivity(intent18)
        }

        var button19 = findViewById<Button> (R.id.button19)
        button19.setOnClickListener {
            var intent19 = Intent (this, Chemo::class.java)
            startActivity(intent19)
        }

        var button7 = findViewById<Button> (R.id.button7)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            startActivity(intent7)
        }
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