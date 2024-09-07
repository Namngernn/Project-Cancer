package com.example.myapplication

import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Path

interface MyAPI {
    @GET("/onlyPatient")
    fun getUsers(): Call<ArrayList<User>>

    @Multipart
    @POST("/uploadBloodResult")
    fun uploadImage(@Part image: MultipartBody.Part, @Part("IDcard") IDcard: RequestBody
    ): Call<UploadResponse>

    @POST("/setPassword")
    suspend fun setPassword(@Body requestBody: RequestBody): Call<userResponse>

    @GET("/user")
    suspend fun getUser(@Body user: User): Call<User>

    @GET("/PatientFeedback/{HN}")
    fun getDataChemo(@Path("HN") HN:String) : Call<ArrayList<ChemoData>>

    @GET("/PatientAppointment/{HN}")
    fun getAppointment(@Path("HN") HN:String) : Call<ArrayList<AppointData>>

    @GET("/PatientInfo/{HN}")
    fun getPatientInfo(@Path("HN") HN: String) : Call<ArrayList<InfoPatient>>

    @GET("/currentAppoint/{HN}")
    fun getCurrentAppoint(@Path("HN") HN: String) : Call<ArrayList<AppointData>>

    @POST("/newPatientSideEffect/{appointId}")
    fun updateSideEffect(@Path("appointId") appointId : String, @Body sideEffect: RequestBody) : Call<ChemoData>

    @GET("/patientGuideBook/{HN}")
    fun getGuideBook(@Path("HN") HN: String) : Call<ArrayList<GuideBookData>>

    @GET("/PatientAppointInfo/{appointId}")
    fun patientAppoint(@Path("appointId") appointId : String) : Call<ArrayList<AppointInfoData>>

    @POST("/PatientPostpone/{appointId}")
    fun patientPostpone(@Path("appointId") appointId : String, @Body newAppoint: RequestBody) : Call<ArrayList<AppointInfoData>>

    @GET("/homeblood/{HN}")
    fun getHomeBlood(@Path("HN") HN: String) : Call<ArrayList<BloodData>>

    @GET("/detailblood/{treatmentId}")
    fun getDetailBlood(@Path("treatmentId") treatmentId: String) : Call<ArrayList<DetailBloodData>>

    @POST("/patientLogin")
    fun patientLogin(@Body user: RequestBody): Call<User>

}