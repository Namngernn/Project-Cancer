package com.example.myapplication

import android.content.ContentValues
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileOutputStream
import java.io.OutputStream

@Suppress("DEPRECATION")
class BloodResult : AppCompatActivity() {
    private val TAG : String = "CHECK_RESPONSE"
    private var selectedImageUri: Uri? = null
    private lateinit var button: Button
    private lateinit var button13: Button
    private lateinit var takephoto: ImageView
    private lateinit var button_upload: Button
    private lateinit var HN:String
    private lateinit var appointId: String
    private lateinit var treatmentId: String
    private lateinit var userName: String
    private var infoPatient : ArrayList<InfoPatient> = arrayListOf<InfoPatient>()
    private var curentAppointData : ArrayList<AppointData> = arrayListOf<AppointData>()
    companion object {
        const val IMAGE_REQUEST_CODE = 100;
        const val REQUEST_IMAGE_CAPTURE = 123
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.bloodresult)



        userName = intent.extras?.getString("userName").toString()
        HN = intent.extras?.getString("HN").toString()
        treatmentId = intent.extras?.getString("treatmentId").toString()

        Log.d("bloodresult", userName)

        getInfoPatient()
        getCurrentAppoint()
        //var HN = bundle?.getString("HN")
       // userName = bundle?.getString("userName").toString()
        //Log.d("idcard", HN.toString())
        //Log.d("idcard", userName)

        val button11 = findViewById<Button> (R.id.button11)
        button11.setOnClickListener {
            var intent11 = Intent (this, DetailBlood::class.java)
            intent11.putExtra("HN", HN)
            intent11.putExtra("treatmentId", treatmentId)
            startActivity(intent11)
        }

        var button7 = findViewById<Button> (R.id.button7)
        button7.setOnClickListener {
            var intent7 = Intent (this, HomePage::class.java)
            intent7.putExtra("HN", HN)
            startActivity(intent7)
        }

        var contact = findViewById<Button> (R.id.contact)
        contact.setOnClickListener {
            var intent = Intent (this, ContactHospital::class.java)
            intent.putExtra("HN", HN)
            startActivity(intent)
        }

        button = findViewById(R.id.button12)
        button13 = findViewById(R.id.button13)
        takephoto = findViewById(R.id.takephoto)
        button_upload = findViewById(R.id.button_upload)

        button.setOnClickListener(){
            pickImageFromGallery()
        }
        button13.setOnClickListener(){
            takePhoto()
        }
        button_upload.setOnClickListener(){
            val artDialogBuilder = AlertDialog.Builder(this@BloodResult)

            artDialogBuilder.setMessage("คุณต้องการส่งผลเลือดใช่หรือไม่")
            artDialogBuilder.setTitle("ยืนยันการส่งผลเลือด")
            artDialogBuilder.setCancelable(false)
            artDialogBuilder.setPositiveButton("ตกลง") {_,_ ->
                uploadImage()
//                mSocket = IO.socket("http://10.50.8.3:8080")
//                if (!mSocket.connected()){
//                    mSocket.connect()
//                    mSocket.emit("CH03", HN)
//                }else if (mSocket.connected()){
//                    mSocket.emit("CH03", HN)
//                }
                SocketHandler.setSocket()
                val mSocket = SocketHandler.getSocket()
                mSocket.connect()
                mSocket.emit("CH03", HN)
                var intent = Intent (this@BloodResult, DetailBlood::class.java)
                intent.putExtra("HN", HN)
                intent.putExtra("userName", userName)
                intent.putExtra("treatmentId", treatmentId)
                startActivity(intent)
            }
            artDialogBuilder.setNegativeButton("ยกเลิก") {_,_ ->
                Toast.makeText(this@BloodResult, "ยกเลิกการดำเนินการ", Toast.LENGTH_SHORT).show()
            }
            artDialogBuilder.setNeutralButton("กลับ") {_,_ ->
                Toast.makeText(this@BloodResult, "กลับหน้าเดิม", Toast.LENGTH_SHORT).show()
            }

            val alertDialogBox = artDialogBuilder.create()
            alertDialogBox.show()
            /*uploadImage()
            var intent = Intent (this@BloodResult, DetailBlood::class.java)
            intent.putExtra("HN", HN)
            intent.putExtra("userName", userName)
            startActivity(intent)*/
        }

    }

//    override fun onDestroy() {
//        super.onDestroy()
//        mSocket.disconnect()
//    }

    private fun pickImageFromGallery() {
        val intent = Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        startActivityForResult(intent, IMAGE_REQUEST_CODE)
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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == IMAGE_REQUEST_CODE && resultCode == RESULT_OK) {
            selectedImageUri = data?.data
            takephoto.setImageURI(selectedImageUri)
        }

        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            val imageBitmap = data?.extras?.get("data") as Bitmap
            takephoto.setImageBitmap(imageBitmap)
            val imageName = "image_${System.currentTimeMillis()}.jpg"
            var fos : OutputStream? = null
            if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.Q){
                this.contentResolver?.also { resolver->
                    val contentValues = ContentValues().apply {
                        put(MediaStore.MediaColumns.DISPLAY_NAME, imageName)
                        put(MediaStore.MediaColumns.MIME_TYPE, "image/jpg")
                        put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_PICTURES)
                    }
                    selectedImageUri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
                    fos = selectedImageUri?.let {
                        resolver.openOutputStream(it)
                    }
                }
            }
            else{
                val imageDirectory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)
                val image = File(imageDirectory, imageName)
                fos = FileOutputStream(image)
            }
            fos?.use {
                imageBitmap.compress(Bitmap.CompressFormat.JPEG, 100, it)
            }
        }
    }
    /*private fun ContentResolver.getFileName(selectedImageUri: Uri): String {
        var name = ""
        val returnCursor = this.query(selectedImageUri, null, null, null, null)
        if(returnCursor!=null) {
            val nameIndex = returnCursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            returnCursor.moveToFirst()
            name = returnCursor.getString(nameIndex)
            returnCursor.close()
        }
        return name
    }*/

    private fun takePhoto() {
        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startActivityForResult(cameraIntent, REQUEST_IMAGE_CAPTURE)
    }

    private fun uploadImage() {
        val fileDir = applicationContext.filesDir
        val file = File(fileDir, "image.jpg")
        val inputStream = contentResolver.openInputStream(selectedImageUri!!)
        val outputStream = FileOutputStream(file)
        inputStream!!.copyTo(outputStream)
        val requestBody = file.asRequestBody("image/*".toMediaTypeOrNull())
        Log.d("response", requestBody.toString())

        val part = MultipartBody.Part.createFormData("image", file.name, requestBody)
        val IDcard = RequestBody.create("text/plain".toMediaTypeOrNull(), userName)
        Log.d("idcard", IDcard.toString())

        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.uploadImage(part, IDcard).enqueue(object : Callback<UploadResponse>{
            override fun onResponse(
                call: Call<UploadResponse>,
                response: Response<UploadResponse>
            ) {
                if (response.isSuccessful){
                    Toast.makeText(applicationContext, "ส่งผลเลือดสำเร็จ", Toast.LENGTH_SHORT).show()
                    Log.d("res", response.toString())
                }
            }

            override fun onFailure(call: Call<UploadResponse>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }

        })



    }

    /*private fun uploadImage() {
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        val parcelFileDescriptor = contentResolver.openFileDescriptor(selectedImageUri!!, "r", null)?: return
        val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
        val file = File(cacheDir, contentResolver.getFileName(selectedImageUri!!))
        val outputStream = FileOutputStream(file)
        inputStream.copyTo(outputStream)
        val body = UploadRequestBody(file, "image")
        retrofitService.uploadImage(
            MultipartBody.Part.createFormData(
            "image",
            file.name,
            body
        ), RequestBody.create("multipart/form-data".toMediaTypeOrNull(), "json")).enqueue(object :
            Callback<UploadResponse> {
            override fun onResponse(
                call: Call<UploadResponse>,
                response: Response<UploadResponse>
            ) {
                response.body()?.let { val textView = findViewById<TextView>(R.id.textView32)
                textView.append(it.message)}
            }

            override fun onFailure(call: Call<UploadResponse>, t: Throwable) {
                val textView = findViewById<TextView>(R.id.textView32)
                textView.append("error")
            }
        })
    }*/

}