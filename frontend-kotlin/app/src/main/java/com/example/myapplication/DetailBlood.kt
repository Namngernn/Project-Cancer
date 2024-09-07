package com.example.myapplication

import android.content.Intent
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

class DetailBlood : AppCompatActivity() {
    private val TAG : String = "CHECK_RESPONSE"
    private lateinit var HN: String
    private lateinit var yourHN: TextView
    private lateinit var yourIDcard: TextView
    private lateinit var yourName: TextView
    private lateinit var yourType: TextView
    private lateinit var yourState: TextView
    private lateinit var yourFormula: TextView
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private var curentAppointData : ArrayList<AppointData> = arrayListOf<AppointData>()
    private var dataList: ArrayList<DetailBloodData> = arrayListOf<DetailBloodData>()
    private lateinit var detailBloodAdapter: DetailBloodAdapter
    private lateinit var appointId: String
    private lateinit var treatmentId: String
    private lateinit var recyclerView: RecyclerView
    private lateinit var userName: String
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.detailblood)

        recyclerView = findViewById(R.id.recycleViewDetailBlood)

        val bundle = intent.extras
        treatmentId = bundle?.getString("treatmentId").toString()
        HN = bundle?.getString("HN").toString()
        userName = bundle?.getString("userName").toString()

        yourHN = findViewById(R.id.yourHN)
        yourIDcard = findViewById(R.id.yourID)
        yourName = findViewById(R.id.yourName)
        yourType = findViewById(R.id.yourType)
        yourFormula = findViewById(R.id.yourFormula)

        val button16 = findViewById<Button> (R.id.button16)
        button16.setOnClickListener {
            var intent16 = Intent (this, HomeBlood::class.java)
            intent16.putExtra("HN", HN)
            startActivity(intent16)
        }

        val button17 = findViewById<Button> (R.id.button17)
        button17.setOnClickListener {
            var intent17 = Intent (this, BloodResult::class.java)
            intent17.putExtra("HN", HN)
            intent17.putExtra("treatmentId", treatmentId)
            intent17.putExtra("userName", userName)
            startActivity(intent17)
        }

        getInfoPatient()
        getCurrentAppoint()
        getDetailBlood()

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
                        for (i in it) {
                            infoPatient?.addAll(listOf(i))
                        }
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

    fun getDetailBlood() {
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getDetailBlood(treatmentId).enqueue(object: Callback<ArrayList<DetailBloodData>> {
            override fun onResponse(
                call: Call<ArrayList<DetailBloodData>>,
                response: Response<ArrayList<DetailBloodData>>
            ) {
                if (response.isSuccessful) {
                    response.body()?.let {
                        for (i in it) {
                            yourHN.text = i.HN
                            yourIDcard.text = i.IDcard
                            yourName.text = i.firstName + " " + i.lastName
                            yourType.text = i.cancer
                            yourFormula.text = i.formulaName
                        }
                    }
                    recyclerView = findViewById<RecyclerView?>(R.id.recycleViewDetailBlood).apply {
                        response.body()?.let {
                            for (a in it.indices){
                                Log.d("index", a.toString())
                            }
                            for (i in it){
                                /*var HN = i.HN
                                var IDcard = i.IDcard*/
                                /*yourHN.text = i.HN
                                yourIDcard.text = i.IDcard
                                yourName.text = i.firstName + " " + i.lastName
                                yourType.text = i.cancerType
                                yourState.text = i.cancerState
                                yourFormula.text = i.formulaName*/
                                if (i.picture == null){
                                    i.picture = "ยังไม่ส่งผลเลือด"
                                }
                                val dataClass = DetailBloodData(i.treatmentId, i.HN, i.IDcard, i.firstName, i.lastName, i.cancer, i.formulaName, i.picture, i.status)
                                dataList.add(dataClass)
                                Log.d("blood", dataList.toString())
                            }
                        }
                    }
                    detailBloodAdapter = DetailBloodAdapter(dataList)
                    recyclerView.adapter = detailBloodAdapter
                    recyclerView.layoutManager = LinearLayoutManager(this@DetailBlood)
                    recyclerView.setHasFixedSize(true)
                    /*detailBloodAdapter.onItemClick = {
                        val intent = Intent(this@DetailBlood, BloodResult::class.java)
                        intent.putExtra("treatmentId", it.treatmentId.toString())
                        intent.putExtra("userName", userName)
                        intent.putExtra("HN", HN)
                        startActivity(intent)
                    }*/
                }
            }

            override fun onFailure(call: Call<ArrayList<DetailBloodData>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }

        })
    }
}