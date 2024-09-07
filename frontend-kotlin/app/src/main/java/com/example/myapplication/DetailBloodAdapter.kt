package com.example.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class DetailBloodAdapter(private val dataList: ArrayList<DetailBloodData>): RecyclerView.Adapter<DetailBloodAdapter.ViewHolderClass>() {
    var onItemClick: ((DetailBloodData) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolderClass {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.detailblooditem_layout, parent, false)
        return ViewHolderClass(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolderClass, position: Int) {
        val currentItem = dataList[position]
        holder.picture.text = currentItem.picture
        holder.status.text = "สถานะ: " + currentItem.status
        holder.itemView.setOnClickListener {
            onItemClick?.invoke(currentItem)
        }
    }

    override fun getItemCount(): Int {
        return dataList.size
    }


    class ViewHolderClass(itemView: View): RecyclerView.ViewHolder(itemView) {
        /*val HN: TextView = itemView.findViewById(R.id.yourHN)
        val IDcard: TextView = itemView.findViewById(R.id.yourID)
        val name: TextView = itemView.findViewById(R.id.yourName)
        val cancerType: TextView = itemView.findViewById(R.id.cancerType)
        val cancerState: TextView = itemView.findViewById(R.id.cancerState)
        val formulaName: TextView = itemView.findViewById(R.id.formulaName)*/
        val picture: TextView = itemView.findViewById(R.id.yourPic)
        val status: TextView = itemView.findViewById(R.id.status)
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