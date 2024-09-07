package com.example.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class AdapterClass(private val dataList: ArrayList<AppointData>): RecyclerView.Adapter<AdapterClass.ViewHolderClass>() {


    var onItemClick: ((AppointData) -> Unit)? = null


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolderClass {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.appointitem_layout, parent, false)
        return ViewHolderClass(itemView)
    }

    override fun getItemCount(): Int {
        return dataList.size
    }


    class ViewHolderClass(itemView: View): RecyclerView.ViewHolder(itemView) {
        val appointDate:TextView = itemView.findViewById(R.id.appointDate)
        val appointTime:TextView = itemView.findViewById(R.id.appointTime)
        val requestStatus:TextView = itemView.findViewById(R.id.requestStatus)
    }

    override fun onBindViewHolder(holder: ViewHolderClass, position: Int) {
        val currentItem = dataList[position]
        holder.appointDate.text = currentItem.appointDate
        holder.appointTime.text = currentItem.appointTime
        holder.requestStatus.text = currentItem.requestStatus
        if (holder.requestStatus.text == "เลื่อนนัดหมายสำเร็จ") {
            holder.requestStatus.setTextColor(Integer.parseUnsignedInt("FF3B9628",16))
        }
        else if (holder.requestStatus.text == "รอดำเนินการเลื่อนนัดหมาย") {
            holder.requestStatus.setTextColor(Integer.parseUnsignedInt("FFB9BE25",16))
        }
        else if (holder.requestStatus.text == "ไม่สามารถเลื่อนนัดหมายได้") {
            holder.requestStatus.setTextColor(Integer.parseUnsignedInt("FFB14127",16))
        }
        holder.itemView.setOnClickListener {
            onItemClick?.invoke(currentItem)
        }

    }
}

/*class AdapterClass(
    val onClickListener : (AppointData) -> Unit): ListAdapter<AppointData, AdapterClass.ViewHolder>(DiffCallBack()) {

    class DiffCallBack : DiffUtil.ItemCallback<AppointData>(){
        override fun areItemsTheSame(oldItem: AppointData, newItem: AppointData): Boolean {
            return oldItem.appointId == newItem.appointId
        }

        override fun areContentsTheSame(oldItem: AppointData, newItem: AppointData): Boolean {
            return oldItem == newItem
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.appointitem_layout, parent, false)
        return ViewHolder(itemView)
    }


    class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        private val appointDate:TextView = itemView.findViewById(R.id.appointDate)
        private val appointTime:TextView = itemView.findViewById(R.id.appointTime)

        fun bindData(appointData: AppointData) {
            appointDate.text = appointData.appointDate
            appointTime.text = appointData.appointTime
        }
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val appointData = getItem(position)

        holder.bindData(appointData)
        holder.itemView.setOnClickListener{
            onClickListener(appointData)
        }
        //holder.appointDate.text = currentItem.appointDate
        //holder.appointTime.text = currentItem.appointTime

    }

}*/