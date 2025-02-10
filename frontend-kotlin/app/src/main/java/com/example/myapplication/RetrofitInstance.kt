package com.example.myapplication

import com.google.gson.GsonBuilder
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

interface RetrofitInstance {
    companion object {
        var mainURL = "http://10.50.8.3:8080"

        fun getRetrofitInstance(): Retrofit{
            return Retrofit.Builder().baseUrl(mainURL)
                .addConverterFactory(GsonConverterFactory.create(GsonBuilder().create()))
                .build()
        }
    }
}