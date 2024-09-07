package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeBlood : AppCompatActivity() {
    private lateinit var HN: String
    private lateinit var userName: String
    private val TAG : String = "CHECK_RESPONSE"
    private lateinit var recyclerView: RecyclerView
    private var dataList: ArrayList<BloodData> = arrayListOf<BloodData>()
    private lateinit var homeBloodAdapter: ResultAdapter
    //private lateinit var cancerType: TextView
    //private lateinit var cancerState: TextView
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private var curentAppointData : ArrayList<AppointData> = arrayListOf<AppointData>()
    private lateinit var appointId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.homeblood)

        recyclerView = findViewById(R.id.recycleViewHomeBlood)
        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()
        userName = bundle?.getString("userName").toString()
        Log.d("Homeblood", userName)

        val button19 = findViewById<Button> (R.id.button19)
        button19.setOnClickListener {
            var intent19 = Intent (this, HomePage::class.java)
            intent19.putExtra("HN", HN)
            startActivity(intent19)
        }

        var contact = findViewById<Button> (R.id.contact)
        contact.setOnClickListener {
            var intent = Intent (this, ContactHospital::class.java)
            intent.putExtra("HN", HN)
            startActivity(intent)
        }

        var button7 = findViewById<Button> (R.id.button8)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            intent7.putExtra("HN", HN)
            startActivity(intent7)
        }

        getInfoPatient()
        getCurrentAppoint()
        getHomeBlood()
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

    private fun getCurrentAppoint() {
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getCurrentAppoint(HN).enqueue(object : Callback<ArrayList<AppointData>> {
            override fun onResponse(
                call: Call<ArrayList<AppointData>>,
                response: Response<ArrayList<AppointData>>
            ) {
                if (response.isSuccessful){
                    response.body()?.let {
                        for (i in it){
                            curentAppointData?.addAll(listOf(i))
                            Log.d("current", curentAppointData.toString())
                        }
                    }
                    for (i in curentAppointData){
                        appointId = i.appointId.toString()

                    }

                }
            }

            override fun onFailure(call: Call<ArrayList<AppointData>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }
        })
    }

    fun getHomeBlood() {
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getHomeBlood(HN).enqueue(object: Callback<ArrayList<BloodData>> {
            override fun onResponse(
                call: Call<ArrayList<BloodData>>,
                response: Response<ArrayList<BloodData>>
            ) {
                if (response.isSuccessful) {
                    recyclerView = findViewById<RecyclerView?>(R.id.recycleViewHomeBlood).apply {
                        response.body()?.let {
                            for (i in it) {
                                val dataClass = BloodData(i.treatmentId, i.cancer, i.formulaName)
                                dataList.add(dataClass)
                                Log.d("hello", dataList.toString())
                            }
                        }
                    }
                    homeBloodAdapter = ResultAdapter(dataList)
                    recyclerView.adapter = homeBloodAdapter
                    recyclerView.layoutManager = LinearLayoutManager(this@HomeBlood)
                    recyclerView.setHasFixedSize(true)

                    homeBloodAdapter.onItemClick = {
                        val intent = Intent(this@HomeBlood, DetailBlood::class.java)
                        intent.putExtra("treatmentId", it.treatmentId.toString())
                        intent.putExtra("userName", userName)
                        intent.putExtra("HN", HN)
                        startActivity(intent)
                    }
                }
            }

            override fun onFailure(call: Call<ArrayList<BloodData>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }

        })
    }
}