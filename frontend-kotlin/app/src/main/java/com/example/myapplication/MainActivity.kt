package com.example.myapplication

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputEditText
import com.google.gson.JsonObject
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


@Suppress("DEPRECATION")
class MainActivity : AppCompatActivity() {
    lateinit var IDcard: TextInputEditText
    private lateinit var password: TextInputEditText
    private lateinit var btn: Button
    private lateinit var firstName: String
    private lateinit var forget: TextView
    private val TAG : String = "CHECK_RESPONSE"
    private var Patient : ArrayList<User> = arrayListOf<User>()
    //test noti
    lateinit var notificationManager: NotificationManager
    lateinit var notificationChannel: NotificationChannel
    lateinit var builder: Notification.Builder
    private val channelID = "deeksha"
    private val desc = "Notifications"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        IDcard = findViewById(R.id.IDcardEditText)
        password = findViewById(R.id.passwordEditText)
        forget = findViewById(R.id.forget)
        //getAllUser()

        forget.setOnClickListener{
            var intent = Intent(this, ForgetPassword::class.java)
            startActivity(intent)
        }

        btn = findViewById(R.id.btn)
        btn.setOnClickListener {
            patientLogin()
            /*val IDcard = IDcard.text.toString()
            val password = password.text.toString()
            var user = Patient.filter { r -> r.userName == IDcard && r.psw == password}
            if (user.isNotEmpty()){
                var bundle = Bundle()
                user.listIterator().let {
                    for(i in it){
                        bundle.putString("userName", IDcard)
                        bundle.putString("psw", password)
                        bundle.putString("firstName", i.firstName)
                        bundle.putString("lastName", i.lastName)
                        bundle.putString("HN", i.HN)
                    }
                }
                var intent = Intent (this, HomePage::class.java)
                intent.putExtras(bundle)
                startActivity(intent)
                Log.d("console bundle", bundle.toString())
            }else {
                Toast.makeText(this, "ไม่มีผู้ใช้นี้ในระบบ หรือยังไม่ได้ลงทะเบียน", Toast.LENGTH_SHORT).show()
            }*/

        }

        val register = findViewById<Button> (R.id.btn2)
        register.setOnClickListener {
            var intent2 = Intent (this, Register::class.java)
            startActivity(intent2)

        }

        //test noti
        /*val btn = findViewById<Button>(R.id.button6)
        notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val intent = Intent(this, Test::class.java)

        btn.setOnClickListener{
            val pendingIntent = PendingIntent.getActivity(this, 0, intent,
                PendingIntent.FLAG_CANCEL_CURRENT or PendingIntent.FLAG_IMMUTABLE)

            //val view = RemoteViews(packageName, R.layout.test)
            if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.O){
                notificationChannel = NotificationChannel(channelID, desc, NotificationManager.IMPORTANCE_HIGH)
                notificationChannel.enableLights(true)
                notificationChannel.lightColor = Color.GRAY
                notificationChannel.enableVibration(false)
                notificationManager.createNotificationChannel(notificationChannel)

                builder = Notification.Builder(this)
                    .setContentTitle("Android Notifications")
                    .setContentText("Test Noti")
                    .setSmallIcon(R.drawable.baseline_notifications_none_24)
                    .setChannelId(channelID)
                    .setLargeIcon(BitmapFactory.decodeResource(this.resources,R.drawable.baseline_notifications_none_24))
                    .setContentIntent(pendingIntent)
            }
            else {
                if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.O){
                    builder = Notification.Builder(this)
                        .setContentTitle("Android Notifications")
                        .setContentText("Test Noti")
                        .setSmallIcon(R.drawable.baseline_notifications_none_24)
                        .setChannelId(channelID)
                        .setLargeIcon(BitmapFactory.decodeResource(this.resources,R.drawable.baseline_notifications_none_24))
                        .setContentIntent(pendingIntent)
                }
            }
            notificationManager.notify(1234, builder.build())
        }*/
        /*btn.setOnClickListener {
            val IDcard = IDcard.text.toString().trim()
            val password = password.text.toString().trim()

            if (IDcard.isEmpty() or password.isEmpty()) {
                Toast.makeText(this, "กรุณากรอกเลขบัตรประจำตัวประชาชน หรือ รหัสผ่าน", Toast.LENGTH_SHORT).show()
            }
        }*/

    }

//    private fun getAllUser() {
//        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
//        retrofitService.getUsers().enqueue(object : Callback<ArrayList<User>> {
//            override fun onResponse(call: Call<ArrayList<User>>, response: Response<ArrayList<User>>) {
//                if (response.isSuccessful){
//                    response.body()?.let{
//                        for (user in it){
//                            Patient?.addAll(listOf(user))
//                        }
//                    }
//                }
//            }
//            override fun onFailure(call: Call<ArrayList<User>>, t: Throwable) {
//                Log.d(TAG, "onFailure : ${t.message}")
//            }
//        })
//
//    }

    private fun patientLogin(){
        val user = IDcard.text.toString()
        val psw = password.text.toString()
        val params = JsonObject().apply {
            addProperty("userName", user)
            addProperty("psw", psw)
        }
        val requestBody = RequestBody.create("application/json".toMediaTypeOrNull(), params.toString())
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.patientLogin(requestBody).enqueue(object : Callback<User>{
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful){
                    response.body()?.let {
                        var bundle = Bundle()
                        bundle.putString("userName", it.userName)
                        bundle.putString("psw", it.psw)
                        bundle.putString("firstName", it.firstName)
                        bundle.putString("lastName", it.lastName)
                        bundle.putString("HN", it.HN)
                        var intent = Intent (this@MainActivity, HomePage::class.java)
                        intent.putExtras(bundle)
                        startActivity(intent)
                    }
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                Toast.makeText(this@MainActivity, "ไม่มีผู้ใช้นี้ในระบบ หรือยังไม่ได้ลงทะเบียน", Toast.LENGTH_SHORT).show()
            }

        })
    }
        /*responseLiveData.observe(this, Observer {
            val commentList = it.body()?.listIterator()
            if (commentList != null) {
                while (commentList.hasNext()){
                    val commentItem = commentList.next()

                    val userName = "ชื่อผู้ใช้: ${commentItem.userName} \n"

                    val textView = findViewById<TextView>(R.id.textView31)
                    textView.append(userName)
                }
            }
        })*/
}