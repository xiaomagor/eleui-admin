<template>


    <div class="app-container">
        <el-table
        v-loading="listLoading"
        :data="pager.pageData"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="UserName">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="账户" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="手机"  align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status===1?'有效':'无效' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>

     <pagination
    :total="pager.totalCount"
    :page.sync="pager.pageIndex"
    :limit.sync="pager.pageSize"
    @pagination="listData" />   

  </div>
  


 
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUserList } from '@/api/user'
export default {
    components: { Pagination },
    filters: {
        statusFilter(status) {
        const statusMap = {0:'success',1:'gray'}
    
        return statusMap[status]
        }
    },
   data() {
        return {
            listLoading : true,
            pager : {
                pageData : [],
                pageIndex: 0 ,
                pageSize: 5,
                totalCount: 0
            }
        }
   },
   // 创建时发起数据请求
  created() {
    this.listData()
  },
  methods: {
   listData() {
      this.listLoading = true
      // 构建查询参数
      let {pageIndex ,pageSize} = this.pager 
     // 发起查询
      getUserList({pageIndex ,pageSize}).then(response => {
        // 数据返回处理
        this.pager = response.data
         setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)

      })
    }
  }
}
</script>