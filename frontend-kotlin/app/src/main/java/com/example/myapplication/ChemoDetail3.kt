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

class ChemoDetail3 : AppCompatActivity() {
    private lateinit var sideEffect: TextView
    private val TAG : String = "CHECK_RESPONSE"
    lateinit var HN:String
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.chemodetail3)

        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()

        getInfoPatient()

        sideEffect = findViewById(R.id.textView21)

        var button11 = findViewById<Button> (R.id.button11)
        button11.setOnClickListener {
            var intent11 = Intent (this, Chemo::class.java)
            startActivity(intent11)
        }

        var button14 = findViewById<Button> (R.id.button14)
        button14.setOnClickListener {
            var intent14 = Intent (this, ChemoDetail2::class.java)
            startActivity(intent14)
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