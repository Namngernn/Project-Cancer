package com.example.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ChemoAdapter(private val dataList: ArrayList<ChemoData>): RecyclerView.Adapter<ChemoAdapter.ViewHolderClass>() {
    var onItemClick: ((ChemoData) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolderClass {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.recordchemoitem_layout, parent, false)
        return ViewHolderClass(itemView)
    }

    override fun getItemCount(): Int {
        return dataList.size
    }


    class ViewHolderClass(itemView: View): RecyclerView.ViewHolder(itemView) {
        val record_text:TextView = itemView.findViewById(R.id.record_text)
        val appointDate:TextView = itemView.findViewById(R.id.appointDate)
    }

    override fun onBindViewHolder(holder: ViewHolderClass, position: Int) {
        val currentItem = dataList[position]
        holder.record_text.text = "บันทึกครั้งที่ " + currentItem.appoint_no
        holder.appointDate.text = "วันที่ " + currentItem.appointDate
        holder.itemView.setOnClickListener {
            onItemClick?.invoke(currentItem)
        }


    }

}