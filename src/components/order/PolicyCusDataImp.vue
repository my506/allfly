<!-- 保单及客户数据导入 -->
<template>
  <div class="page">
    <header>
      <div></div>
      <h1>保单及客户数据导入</h1>
      <dl>
        <dt><strong>步骤一：下载保单客户控数据模版（Excel格式）</strong></dt>
        <dd>
          根据导入保单数据的分类选择合适的Excel模版<span
            >使用模版切勿更改标题字段信息</span
          >
        </dd>
        <dd>
          选择要导入的笔数建议不超过一万笔
          <el-input-number
            v-model="num8"
            controls-position="right"
            size="mini"
            :min="1"
            :max="10000"
          ></el-input-number>
          
          <el-button type="primary" size="mini" @click="showDialog">数据模版下载</el-button>
          <el-button style="display: inline" type="primary" size="mini" @click="dialogVisible = true"
            >模版更新
          </el-button>
          <ModelDialog :dialogFormVisible="dialogFormVisible"  @change="change"></ModelDialog>
        </dd>
        <dt>
          <strong>步骤二：填入数据 </strong
          >将您需要导入的数据填入模版中，并保存至本地硬盘
        </dt>
        <dd>
          要如何检查数据内容的格式是否正确？<a href=""
            >数据格式要求和常见问题(FAQ)</a
          >
        </dd>
        <dt>
          <strong>步骤三：选择数据来源</strong>
          选择将步骤二装填好的Excel格式数据：<span
            >选择数据文件时，确保文件在没有打开状态</span
          >
        </dt>
        <dd>
          <fieldset>
            <legend></legend>
            <el-row :gutter="20">
              <el-col :span="10" :offset="2">
                <el-input size="mini"></el-input>
              </el-col>
              <el-col :span="3">
                <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3"
            style="display: inline"
          >
           
            <el-button type="primary" size="mini">...</el-button>
         
          </el-upload>
               
              </el-col>
            </el-row>
          </fieldset>
          <el-row>
            <el-col :span="8" :offset="2">
              险种匹配采用
              <el-radio-group v-model="radio1">
                <el-radio :label="1">简称</el-radio>
                <el-radio :label="2">全称</el-radio>
                <el-radio :label="3">代码</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8">
              客户数据存在时
              <el-radio-group v-model="radio2">
                <el-radio :label="4">忽略</el-radio>
                <el-radio :label="5">覆盖</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <div class="blank-space"></div>
          <el-row :gutter="20">
            <el-col :span="3" :offset="6">
              <el-button type="primary" size="mini">数据格式验证</el-button>
            </el-col>

            <el-col :span="4">
              <el-button type="primary" size="mini"
                >数据格式验证并导入</el-button
              >
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="mini">取消</el-button>
            </el-col>
          </el-row>
        </dd>
      </dl>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>更新成功，可以进入标准模板下载</span>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </header>
    <main>
      <el-tabs size="mini" type="border-card">
        <el-tab-pane size="mini" label="任务">
          <el-table size="mini" :data="tableData" border style="width: 100%">
            <el-table-column prop="index" label="" width="100">
            </el-table-column>
            <el-table-column prop="name" label="任务" width="180">
            </el-table-column>
            <el-table-column prop="address" label="结果"> </el-table-column>
            <el-table-column fixed="right" label="" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >导出查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="同步监看日志">
          <el-table size="mini" :data="tableData1" border style="width: 100%">
            <el-table-column prop="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="name" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="address" label="操作"> </el-table-column>
            <el-table-column
              prop="address"
              fixed="right"
              label="结果"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >导出查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="验证结果记录">
          <el-table size="mini" :data="tableData2" border style="width: 100%">
            <el-table-column prop="index" label="序号" width="100">
            </el-table-column>
            <!-- <el-table-column prop="name" label="编号" width="180">
            </el-table-column> -->
            <el-table-column prop="address" label="操作"> </el-table-column>
            <el-table-column prop="address" label="结果">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >导出查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="导入成功">
          <el-table size="mini" :data="tableData2" border style="width: 100%">
            <el-table-column prop="index" label="序号" width="100">
            </el-table-column>
            <!-- <el-table-column prop="name" label="编号" width="180">
            </el-table-column> -->
            <el-table-column prop="address" label="操作"> </el-table-column>
            <el-table-column prop="address" label="结果">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >导出查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="导入失败">
          <el-table size="mini" :data="tableData2" border style="width: 100%">
            <el-table-column prop="index" label="序号" width="100">
            </el-table-column>
            <!-- <el-table-column prop="name" label="编号" width="180">
            </el-table-column> -->
            <el-table-column prop="address" label="操作"> </el-table-column>
            <el-table-column prop="address" label="结果">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >导出查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="重复保单"
          ><el-table size="mini" :data="tableData2" border style="width: 100%">
            <el-table-column prop="index" label="序号" width="100">
            </el-table-column>
            <!-- <el-table-column prop="name" label="编号" width="180">
            </el-table-column> -->
            <el-table-column prop="address" label="操作"> </el-table-column>
            <el-table-column prop="address" label="结果">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >导出查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
import ModelDialog from 'base/model-dialog/ModelDialog.vue'
export default {
  data() {
    return {
      dialogVisible: false,
       fileList3: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "模版字段合法性验证",
          address: "待验证"
        },
        {
          date: "2016-05-04",
          name: "数据内容格式验证",
          address: "待验证"
        },
        {
          date: "2016-05-01",
          name: "客户数据导入",
          address: "待导入"
        },
        {
          date: "2016-05-03",
          name: "保单数据导入",
          address: "待导入"
        }
      ],
      tableData1: [
        {
          index: "1",
          name: "模版字段合法性验证",
          address: "待验证"
        },
        {
          index: "2",
          name: "数据内容格式验证",
          address: "待验证"
        },
        {
          index: "3",
          name: "客户数据导入",
          address: "待导入"
        },
        {
          index: "4",
          name: "保单数据导入",
          address: "待导入"
        }
      ],
      tableData2: [
        {
          index: "1",
          name: "模版字段合法性验证",
          address: "待验证"
        },
        {
          index: "2",
          name: "数据内容格式验证",
          address: "待验证"
        },
        {
          index: "3",
          name: "客户数据导入",
          address: "待导入"
        },
        {
          index: "4",
          name: "保单数据导入",
          address: "待导入"
        }
      ],
      num8: 1,
      radio1: 1,
      radio2: 4,
      claimOrderNum: "",
      radio: "allComp",
      compDisabled1: true,
      compDisabled2: true,

      insurCompany: "指定保险公司",

      selectedComp: "",
      time: "dealDate",
      numberSel: "保单号码",
      numberSel1: "保单",

      selectedInstit: ["不区分"],
      insitDisabled: false,

      input: "",
      // dialogVisible: false,
      outerVisible: false,
      innerVisible: false,
      dialogFormVisible:false
    };
  },
  methods: {
    change() {
      this.dialogFormVisible=false
    },
    showDialog() {
      // this.$router.push({
      //   path: "/user/modelDialog",
      //   // query: { findOrderItem: this.findOrderItem }
      // });
      this.dialogFormVisible = true
    },

    isClose() {
      console.log("是否要关闭弹框");
    }
    // formValidator(){
    //   return true;
    // }
  },
  components: {
    ModelDialog
    }
};
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 20px;
}
.page {
  padding: 10px 30px 0 30px;
  // height:100%;
  height: 100%;
  overflow-y: scroll;
}
dt {
  // font-size: 1.5em;
  // color: #409eff;
  span {
    color: red;
  }
}
dd {
  margin: 10px 0px 5px 20px;
  span {
    color: red;
  }
}
fieldset {
  padding: 0.35em 0.625em 0.75em;
  margin: 0 2px;
  border: 1px solid #ebeef5;
}
legend {
  padding: 0.5em;
  border: 0;
  width: auto;
}
fieldset:first-child ul li,
fieldset:nth-child(2) div,
fieldset:nth-child(3) li {
  height: 30px;
  margin-top: 2px;
  line-height: 30px;
  text-align: middle;
}
.elradio {
  height: 28px;
  line-height: 28px;
}
fieldset:nth-child(4) span {
  margin-left: 10px;
}
.subutton {
  margin-bottom: 20px;
}
#btn {
  margin-top: 20px;
  width: 110px;
  height: 35px;
  background-color: #409eff;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 0 5px;
}
.find {
  margin-top: 5px;
  display: flex;
  flex-flow: row nowrap;
}
.elformitem {
  margin-bottom: 0px;
}
.findleft {
  width: 40%;
}
.findright {
  width: 60%;
  padding: 0 5px 0 10px;
}
.el-dialog__body {
  padding: 10px !important;
}
.title {
  display: inline-block;
  width: 15%;
  text-align: right;
  margin-right: 5px;
}
.row {
  margin-bottom: 10px;
}
.oprateBtn {
  float: right;
  margin-top: 20px;
}
.blank-space {
  height: 20px;
}
.el-upload-list {
  margin-top: -20px;
  margin-left:100px;
}
</style>
