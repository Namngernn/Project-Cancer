package com.example.myapplication

import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.concurrent.Executors

class GuideBook : AppCompatActivity() {
    private val TAG : String = "CHECK_RESPONSE"
    lateinit var HN:String
    private lateinit var formular: TextView
    private lateinit var qrcode: ImageView
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private lateinit var downloadPDF: Button
    var mydownloadid: Long = 0
    private lateinit var pdfDocument: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.guidebook)
        val bundle = intent.extras
        HN = bundle?.getString("HN").toString()

        getInfoPatient()
        getGuideBook()

        formular = findViewById(R.id.textView35)
        qrcode = findViewById(R.id.imageView3)
        downloadPDF = findViewById(R.id.downloadPDF)

        var button11 = findViewById<Button> (R.id.button11)
        button11.setOnClickListener {
            var intent11 = Intent (this, HomePage::class.java)
            intent11.putExtra("HN", HN)
            startActivity(intent11)
        }

        var contact = findViewById<Button> (R.id.contact)
        contact.setOnClickListener {
            var intent = Intent (this, ContactHospital::class.java)
            intent.putExtra("HN", HN)
            startActivity(intent)
        }

        var button7 = findViewById<Button> (R.id.button7)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            intent7.putExtra("HN", HN)
            startActivity(intent7)
        }

        downloadPDF.setOnClickListener {
            Log.d("pdf", pdfDocument)
            var request = DownloadManager.Request(Uri.parse(pdfDocument))
                .setTitle("คู่มือผู้ป่วย")
                .setDescription("กำลังดาวน์โหลด")
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE)
                .setAllowedOverMetered(true)
                .setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "test")

            var dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            mydownloadid = dm.enqueue(request)
            Log.d("myid", mydownloadid.toString())
        }

        var br = object: BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                var id = intent?.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
                if (id == mydownloadid) {
                    Toast.makeText(applicationContext, "ดาวน์โหลดเรียบร้อย", Toast.LENGTH_LONG).show()
                }
            }
        }
        registerReceiver(br, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
    }

    private fun getGuideBook(){
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getGuideBook(HN).enqueue(object : Callback<ArrayList<GuideBookData>>{
            override fun onResponse(
                call: Call<ArrayList<GuideBookData>>,
                response: Response<ArrayList<GuideBookData>>
            ) {
                if (response.isSuccessful){
                    response.body()?.let {
                        for (i in it){
                            formular.text = i.formulaName
                            Log.d("test", i.toString())
                            val executor = Executors.newSingleThreadExecutor()
                            val handler = Handler(Looper.getMainLooper())
                            var image:Bitmap? = null
                            executor.execute{
                                pdfDocument = "http://10.50.8.3:3000/".plus(i.pdf)
                                val imageUrl = "http://10.50.8.3:3000/".plus(i.QRcode)
                                Log.d("image", imageUrl)
                                try {
                                    val `in` = java.net.URL(imageUrl).openStream()
                                    image = BitmapFactory.decodeStream(`in`)

                                    handler.post{
                                        qrcode.setImageBitmap(image)
                                    }

                                }catch (e:java.lang.Exception){
                                    e.printStackTrace()
                                }
                            }

                        }
                    }
                }
            }

            override fun onFailure(call: Call<ArrayList<GuideBookData>>, t: Throwable) {
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