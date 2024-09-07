package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import com.google.gson.JsonObject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Suppress("DEPRECATION")
class ForgetPassword : AppCompatActivity() {
    lateinit var HN:String
    private var Patient : ArrayList<User> = arrayListOf<User>()
    private val TAG : String = "CHECK_RESPONSE"
    private lateinit var IDcard: TextInputEditText
    private lateinit var IDcardContainer: TextInputLayout
    private lateinit var password: TextInputEditText
    private lateinit var confirmPassword: TextInputEditText
    private lateinit var passwordContainer: TextInputLayout
    private lateinit var confirmPasswordContainer: TextInputLayout
    private lateinit var confirmChangePassword: Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.forget_password)

        IDcard = findViewById(R.id.IDcardEditText)
        IDcardContainer = findViewById(R.id.IDcardContainer)
        password = findViewById(R.id.passwordEditText)
        confirmPassword = findViewById(R.id.confirmPasswordEditText)
        passwordContainer = findViewById(R.id.passwordContainer)
        confirmPasswordContainer = findViewById(R.id.confirmPasswordContainer)

        val back = findViewById<Button> (R.id.btn)
        back.setOnClickListener {
            var intent = Intent (this, MainActivity::class.java)
            startActivity(intent)
        }

        getAllUser()

        IDcard.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                IDcardContainer.helperText = validIDcard()
            }
        }
        password.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                passwordContainer.helperText = validPassword()
            }
        }

        confirmPassword.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                confirmPasswordContainer.helperText = validConfirmPassword()
            }
        }

        confirmChangePassword = findViewById<Button> (R.id.btn2)
        confirmChangePassword.setOnClickListener {
            //setPassword()
            val artDialogBuilder = AlertDialog.Builder(this@ForgetPassword)

            artDialogBuilder.setMessage("คุณต้องการเปลี่ยนรหัสผ่านใช่หรือไม่")
            artDialogBuilder.setTitle("ยืนยันการเปลี่ยนรหัสผ่าน")
            artDialogBuilder.setCancelable(false)
            artDialogBuilder.setPositiveButton("ตกลง") {_,_ ->
                setPassword()
                var intent21 = Intent (this, MainActivity::class.java)
                startActivity(intent21)
            }
            artDialogBuilder.setNegativeButton("ยกเลิก") {_,_ ->
                Toast.makeText(this@ForgetPassword, "ยกเลิกการดำเนินการ", Toast.LENGTH_SHORT).show()
            }
            artDialogBuilder.setNeutralButton("กลับ") {_,_ ->
                Toast.makeText(this@ForgetPassword, "กลับหน้าเดิม", Toast.LENGTH_SHORT).show()
            }

            val alertDialogBox = artDialogBuilder.create()
            alertDialogBox.show()
        }
    }

    private fun setPassword() {
        val idcard = IDcard.text.toString()
        Log.d("idcard", idcard)
        val passw = password.text.toString()
        val params = JsonObject().apply {
            addProperty("userName", idcard)
            addProperty("psw", passw)
        }
        val requestBody = RequestBody.create("application/json".toMediaTypeOrNull(), params.toString())
        //val userName = RequestBody.create("text/plain".toMediaType(), idcard)
        //val psw = RequestBody.create("text/plain".toMediaType(), passw)
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            val response = retrofitService.setPassword(requestBody)
            Log.d("response", response.toString())
        }
    }

    private fun validIDcard(): String? {
        val idText = IDcard.text.toString()
        if (idText.length != 13) {
            return "กรุณากรอกเลขประจำตัวประชาชน 13 หลัก"
        }
        return null
    }

    private fun validPassword(): String? {
        val passwordText = password.text.toString()
        if (passwordText.length < 6) {
            return "กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัว"
        }
        return null
    }

    private fun validConfirmPassword(): String? {
        val confirmPasswordText = confirmPassword.text.toString()
        val passwordText = password.text.toString()
        if (confirmPasswordText.length < 6) {
            return "กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัว"
        }
        if (confirmPasswordText != passwordText) {
            return "ยืนยันรหัสผ่านไม่ถูกต้อง"
        }
        return null
    }

    private fun getAllUser() {
        val retrofitService = RetrofitInstance.getRetrofitInstance().create(MyAPI::class.java)
        retrofitService.getUsers().enqueue(object : Callback<ArrayList<User>> {
            override fun onResponse(call: Call<ArrayList<User>>, response: Response<ArrayList<User>>) {
                if (response.isSuccessful){
                    response.body()?.let{
                        for (user in it){
                            Patient?.addAll(listOf(user))
                        }
                    }
                }
            }
            override fun onFailure(call: Call<ArrayList<User>>, t: Throwable) {
                Log.d(TAG, "onFailure : ${t.message}")
            }
        })

    }
}