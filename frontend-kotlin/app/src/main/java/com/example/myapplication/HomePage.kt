package com.example.myapplication

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Suppress("DEPRECATION")
class HomePage : AppCompatActivity() {
    private val TAG: String = "CHECK_RESPONSE"
    private lateinit var name: TextView
    private lateinit var pass: TextView
    private val CHANNEL_ID = "นัดหมาย"
    private val NOTIFICATION_ID = 1
    private var infoPatient: ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private var curentAppointData: ArrayList<AppointData> = arrayListOf<AppointData>()
    private lateinit var HN: String
    private lateinit var button22: TextView
    private lateinit var appointId: String

    lateinit var notificationManager: NotificationManager
    lateinit var notificationChannel: NotificationChannel
    lateinit var builder: Notification.Builder
    private val channelID = "deeksha"
    private val desc = "Notifications"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.homepage)
        name = findViewById(R.id.textView4)

        button22 = findViewById(R.id.button22)

        val bundle = intent.extras
        val userName = bundle?.getString("userName")
        HN = bundle?.getString("HN").toString()

        getInfoPatient()
        getCurrentAppoint()

        Log.d("test", userName.toString())
        Log.d("test", HN.toString())

        pass = findViewById(R.id.textView22)

        var button4 = findViewById<Button>(R.id.button4)
        button4.setOnClickListener {
            val sendData = Intent(this, HomeBlood::class.java).apply {
                putExtra("userName", userName)
                putExtra("HN", HN)
            }
            startActivity(sendData)
        }

        var contact = findViewById<Button>(R.id.contact)
        contact.setOnClickListener {
            var intent = Intent(this, ContactHospital::class.java)
            intent.putExtras(bundle!!)
            startActivity(intent)
        }

        var button2 = findViewById<Button>(R.id.button2)
        button2.setOnClickListener {
            var intent2 = Intent(this, Chemo::class.java)
            intent2.putExtras(bundle!!)
            startActivity(intent2)
        }

        var button3 = findViewById<Button>(R.id.button3)
        button3.setOnClickListener {
            var intent3 = Intent(this, GuideBook::class.java)
            intent3.putExtras(bundle!!)
            startActivity(intent3)
            //shownotification()
            /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                var notificationBuilder : Notification.Builder? = null
                val importance = NotificationManager.IMPORTANCE_HIGH
                val notificationChannel = NotificationChannel(CHANNEL_ID, CHANNEL_NAME, importance)
                val bitmap = BitmapFactory.decodeResource(resources, R.drawable.baseline_calendar_month_24)
                val intent = Intent(this, HomePage::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK
                val pendingIntent = PendingIntent.getActivity(this, Calendar.getInstance().timeInMillis.toInt(),
                    intent, 0)
                notificationBuilder = Notification.Builder(this, CHANNEL_ID).setContentTitle("Big Picture Notification")
                    .setContentText("this is a big notification")
                    .setSmallIcon(R.drawable.baseline_notifications_none_24)
                    .setStyle(Notification.BigPictureStyle(notificationBuilder).bigPicture(bitmap))
                    .addAction(R.drawable.baseline_calendar_month_24, "show activity", pendingIntent)

                val notificationManager = this.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                notificationManager.createNotificationChannel(notificationChannel)
                notificationManager.notify(0, notificationBuilder.build())
            }*/
            //var intent3 = Intent (this, GuideBook::class.java)
            //intent.putExtras(bundle!!)
            //startActivity(intent3)
        }

        var button = findViewById<Button>(R.id.button)
        button.setOnClickListener {
            var intent = Intent(this, Appoint::class.java)
            intent.putExtras(bundle!!)
            startActivity(intent)
        }

        /*var button7 = findViewById<Button> (R.id.button7)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            intent7.putExtra("HN", HN)
            intent7.putExtras(bundle!!)
            startActivity(intent7)
        }*/

        var logout = findViewById<ImageView>(R.id.imageView)
        logout.setOnClickListener {
            var intent = Intent(this, MainActivity::class.java)
            intent.putExtras(bundle!!)
            startActivity(intent)
        }

        SocketHandler.setSocket()
        val mSocket = SocketHandler.getSocket()
        notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        mSocket.connect().let {
            it.on("to $HN") { args ->
                runOnUiThread {
                    val msg = args[0].toString()
                    if (Build.VERSION.SDK_INT>= Build.VERSION_CODES.O){
//                        notificationChannel = NotificationChannel(channelID, desc, NotificationManager.IMPORTANCE_HIGH)
//                        notificationChannel.enableLights(true)
//                        notificationChannel.lightColor = Color.GRAY
//                        notificationChannel.enableVibration(false)
//                        notificationManager.createNotificationChannel(notificationChannel)

                        builder = Notification.Builder(this)
                        .setContentTitle("Android Notifications")
                        .setContentText(msg.toString())
                        .setSmallIcon(R.drawable.baseline_notifications_none_24)
                        .setChannelId(channelID)
                        .setLargeIcon(BitmapFactory.decodeResource(this.resources,R.drawable.baseline_notifications_none_24))
                    }
                    else {
                        if (Build.VERSION.SDK_INT>= Build.VERSION_CODES.O){
                        builder = Notification.Builder(this)
                        .setContentTitle("Android Notifications")
                        .setContentText(msg.toString())
                        .setSmallIcon(R.drawable.baseline_notifications_none_24)
                        .setChannelId(channelID)
                        .setLargeIcon(BitmapFactory.decodeResource(this.resources,R.drawable.baseline_notifications_none_24))

                        }
                    }
                    notificationManager.notify(1234, builder.build())
                }
            }
        }
    }

//        mSocket = IO.socket("http://10.50.8.3:8080")
//        mSocket.connect()
//
//        mSocket?.on("to $HN"){ msg ->
//
//            //val view = RemoteViews(packageName, R.layout.test)
//            if (Build.VERSION.SDK_INT>= Build.VERSION_CODES.O){
//                notificationChannel = NotificationChannel(channelID, desc, NotificationManager.IMPORTANCE_HIGH)
//                notificationChannel.enableLights(true)
//                notificationChannel.lightColor = Color.GRAY
//                notificationChannel.enableVibration(false)
//                notificationManager.createNotificationChannel(notificationChannel)
//
//                builder = Notification.Builder(this)
//                    .setContentTitle("Android Notifications")
//                    .setContentText(msg[0].toString())
//                    .setSmallIcon(R.drawable.baseline_notifications_none_24)
//                    .setChannelId(channelID)
//                    .setLargeIcon(BitmapFactory.decodeResource(this.resources,R.drawable.baseline_notifications_none_24))
//            }
//            else {
//                if (Build.VERSION.SDK_INT>= Build.VERSION_CODES.O){
//                    builder = Notification.Builder(this)
//                        .setContentTitle("Android Notifications")
//                        .setContentText(msg[0].toString())
//                        .setSmallIcon(R.drawable.baseline_notifications_none_24)
//                        .setChannelId(channelID)
//                        .setLargeIcon(BitmapFactory.decodeResource(this.resources,R.drawable.baseline_notifications_none_24))
//
//                }
//            }
//            notificationManager.notify(1234, builder.build())
//        }


        /*var button7 = findViewById<Button>(R.id.button7)
        button7.setOnClickListener{
            Log.d("io", mSocket?.connected().toString())
            mSocket?.emit("CH01", "hey")
        }

        mSocket?.on("info"){msg ->
            run {
                Log.d("io", msg[0].toString())
            }
        }*/
        //getUser()

        /*private fun shownotification() {
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Big Picture Notification")
            .setContentText("this is a big notification")
            .setSmallIcon(R.drawable.baseline_notifications_none_24)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val cName = "นัดหมาย"
            val cDescription = "วันที่ 10 มีนาคม 2567"
            val cImportance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(CHANNEL_ID, cName, cImportance).apply {
                description = cDescription
            }

            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
        with(NotificationManagerCompat.from(this)) {
            notify(NOTIFICATION_ID, builder.build())
        }
    }*/

        /*private fun getUser() {
        val requestBody = RequestBody.create("application/json".toMediaTypeOrNull(), params.toString())
        //val userName = RequestBody.create("text/plain".toMediaType(), idcard)
        //val psw = RequestBody.create("text/plain".toMediaType(), passw)
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            val response = retrofitService.getUser(User())
            Log.d("response", response.toString())
        }

    }*/


        private fun getInfoPatient() {
            val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
            retrofitService.getPatientInfo(HN).enqueue(object : Callback<ArrayList<InfoPatient>> {
                override fun onResponse(
                    call: Call<ArrayList<InfoPatient>>,
                    response: Response<ArrayList<InfoPatient>>
                ) {
                    if (response.isSuccessful) {
                        response.body()?.let {
                            for (i in it) {
                                infoPatient?.addAll(listOf(i))
                            }
                        }
                        for (i in infoPatient) {
                            name.text = i.prefix.plus(i.firstName).plus(" ").plus(i.lastName)
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
            retrofitService.getCurrentAppoint(HN)
                .enqueue(object : Callback<ArrayList<AppointData>> {
                    override fun onResponse(
                        call: Call<ArrayList<AppointData>>,
                        response: Response<ArrayList<AppointData>>
                    ) {
                        if (response.isSuccessful) {
                            if (response.body()?.isEmpty() == true) {
                                button22.text = "ยังไม่มีนัดหมาย"
                            } else {
                                response.body()?.let {
                                    for (i in it) {
                                        curentAppointData?.addAll(listOf(i))
                                        Log.d("current", curentAppointData.toString())
                                    }
                                    for (i in curentAppointData) {
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
                                        } else if (month == "02") {
                                            month = "กุมภาพันธ์"
                                        } else if (month == "03") {
                                            month = "มีนาคม"
                                        } else if (month == "04") {
                                            month = "เมษายน"
                                        } else if (month == "05") {
                                            month = "พฤษภาคม"
                                        } else if (month == "06") {
                                            month = "มิถุนายน"
                                        } else if (month == "07") {
                                            month = "กรกฎาคม"
                                        } else if (month == "08") {
                                            month = "สิงหาคม"
                                        } else if (month == "09") {
                                            month = "กันยายน"
                                        } else if (month == "10") {
                                            month = "ตุลาคม"
                                        } else if (month == "11") {
                                            month = "พฤศจิกายน"
                                        } else {
                                            month = "ธันวาคม"
                                        }
                                        if (day == "01") {
                                            day = "1"
                                        } else if (day == "02") {
                                            day = "2"
                                        } else if (day == "03") {
                                            day = "3"
                                        } else if (day == "04") {
                                            day = "4"
                                        } else if (day == "05") {
                                            day = "5"
                                        } else if (day == "06") {
                                            day = "6"
                                        } else if (day == "07") {
                                            day = "7"
                                        } else if (day == "08") {
                                            day = "8"
                                        } else if (day == "09") {
                                            day = "9"
                                        }
                                        button22.text =
                                            day.plus(" ").plus(month).plus(" ")
                                                .plus(year.toString())
                                        //button22.text = date.plus(" ").plus(hour.plus(":").plus(minute))
                                    }
                                }
                            }
                        }
                    }

                    override fun onFailure(call: Call<ArrayList<AppointData>>, t: Throwable) {
                        Log.d(TAG, "onFailure : ${t.message}")
                    }
                })
        }
    }

