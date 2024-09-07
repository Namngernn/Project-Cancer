package com.example.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ResultAdapter(private val dataList: ArrayList<BloodData>): RecyclerView.Adapter<ResultAdapter.ViewHolderClass>() {
    var onItemClick: ((BloodData) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolderClass {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.homeblooditem_layout, parent, false)
        return ViewHolderClass(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolderClass, position: Int) {
        val currentItem = dataList[position]
        holder.cancerType.text = currentItem.cancer
        holder.formulaName.text = "สูตรยา " + currentItem.formulaName
        holder.itemView.setOnClickListener {
            onItemClick?.invoke(currentItem)
        }
    }

    override fun getItemCount(): Int {
        return dataList.size
    }


    class ViewHolderClass(itemView: View): RecyclerView.ViewHolder(itemView) {
        val cancerType: TextView = itemView.findViewById(R.id.cancerType)
        //val cancerState: TextView = itemView.findViewById(R.id.cancerState)
        val formulaName: TextView = itemView.findViewById(R.id.formulaName)
    }

    /*override fun onBindViewHolder(holder: ViewHolderClass, position: Int) {
        val currentItem = dataList[position]
        holder.record_text.text = "บันทึกครั้งที่ " + currentItem.feedbackId
        holder.appointDate.text = "วันที่ " + currentItem.appointDate
        holder.itemView.setOnClickListener {
            onItemClick?.invoke(currentItem)
        }


    }*/

}