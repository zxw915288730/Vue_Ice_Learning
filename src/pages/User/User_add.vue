<template>

  <el-dialog title="新增" width="50%"   center  :visible.sync="add_show" :before-close="beforeClose">
    <el-form  :model="user"  ref="ruleForm" :rules="rules" class="demo-form-inline" >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="username" label="账号" :label-width="formLabelWidth">
              <el-input v-model="user.username"  placeholder="请输入 账号"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="12">
              <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="user.name"  placeholder="请输入 姓名"></el-input>
              </el-form-item>
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="sid" label="工号" :label-width="formLabelWidth">
            <el-input v-model.number="user.sid"   placeholder="请输入 工号"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="12">
              <el-form-item prop="sex"  label=" 性别" :label-width="formLabelWidth">
                  <el-select  align="center"  v-model="user.sex"  placeholder="请选择 性别"> <!--style="width: 185px;" -->
                      <el-option align="center"  label="男" value="1"></el-option>
                      <el-option align="center"  label="女" value="0"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :span="12"> <!-- fuck value-format="yyyy-MM-dd"  日期选择器 需要 这样进行时间格式化！-->
              <el-form-item  prop="dob" label="出生日期" :label-width="formLabelWidth" >
                  <el-date-picker v-model="user.dob"    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期" :editable=false  > </el-date-picker>
              </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item prop="isenable" label="是否启用" :label-width="formLabelWidth" >
              <el-select  align="center"  v-model="user.isenable"  placeholder="请选择 "> <!--style="width: 185px;" -->
                  <el-option align="center"  label="启用" value="1"></el-option>
                  <el-option align="center"  label="禁用" value="0"></el-option>
              </el-select>
            <!--<el-switch v-model="user.isenable" :value ="user.isenable"  inactive-text="禁用" active-text="启用" active-color="#13ce66" >  </el-switch>-->
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="remark" label="备注信息" :label-width="formLabelWidth">
        <el-input v-model="user.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="最多输入10个字哦~" maxlength="10">    </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-check" @click="dialog_ok('ruleForm')" >确 定</el-button>
      <el-button type="danger" icon="el-icon-close" @click="$store.state.dialog_store.add_show=false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { validateMobile } from '@/utils/validate';
//  import {httpUrl} from '../../utils/http_url';
  import {StrToGMT,GMTToStr} from '../../utils/times.js';
import { mapGetters ,mapState} from 'vuex'
  export default {
      computed: {
          ...mapGetters([ 'add_show','edit_show' ]),
//          ...mapState(['tableData','show' ]),
      },
      created(){
//          this.user.isenable = true;
//          alert(this.user.isenable)
      },

      mounted(){
//          alert(this.user.isenable)
      },
      data() {
        const Myvalidate = (rule, value, callback) => {
            if (!validateMobile(value)) {
                callback(new Error('请输入正确手机号码！'))
            }
        }
      return {
            user:{},
//          user:{      // sos 这里的 对象名 不能与 edit 组件中的  对象名 相同  否则 点击编辑后  再点击新增 会记录回显的信息
//              isenable:'', //  启用/禁用状态 需要在这里初始化默认值  否则 新增的时候 会默认为空 而不是 true/false
//          },
          formLabelWidth: '80px',
        rules: {
            username: [
                { required: true, message: '请输入 账号', trigger: 'blur' }, //为空时 提示信息
                {  min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } ],  // 验证不通过时 提示信息
            name: [
                { required: true, message: '请输入 姓名', trigger: 'blur' }, //为空时 提示信息
                {  min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } ],  // 验证不通过时 提示信息
            sid: [
                { required: true, message: '请输入 工号',trigger: 'blur'},
                { type: 'number', message: '年龄必须为数字值'}],
            dob: [
                { type: 'string', required: true, message: '请选择日期', trigger: 'blur' }],
            sex: [
                { required: true, message: '请选择 性别', trigger: 'change' }       ],
            isenable: [
              { required: true, message: '请选择 是否启用', trigger: 'change' }       ],
            remark: [
                { required: true, message: '请输入 备注', trigger: 'blur' },
                {  min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' } ],  //
            tel: [
                { required: true,  trigger: 'blur',validator: Myvalidate  }], // sos  这里指定了 自定义验证 所以不能 使用message: '请选择日期' 属性 否则回调显示的验证信息就无法显示
        },
      }
    },

    watch: {
        add_show: function (newQuestion, oldQuestion) {
//            console.log(newQuestion,oldQuestion);
            if(newQuestion){this.user = {};  }// 监视 新增框弹出  如果弹出则 清空弹出框中的所有内容 防止记录上次内容 fuck 每次都不能正确回显 是因为这里清空了 我日！！！！！！1
            else {this.cancelFieldValidate('ruleForm')} // 监视 关闭新增框 时 清除校检信息 防止记录上次的校检信息
        },
    },

    methods: {
        beforeClose() {this.$store.state.dialog_store.add_show=false},
        cancelFieldValidate (formName) { this.$refs[formName].resetFields();}, // 清除校检信息 防止记录上次的校检信息

        dialog_ok(formName){
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid){
                    console.log(this.user,'user');
//                    this.$axios.post('api/sys_user', this.user).then(function (res) {
                    this.user.dob =  GMTToStr(this.user.dob); // 1. sos 转换
                    this.$axios.post('api/sys_user/POST', this.user).then(function (res) {
                        _this.$message.success('新增成功！');
                        _this.$store.state.dialog_store.add_show=false,
                            _this.$emit('addSaveTodo'); // 添加成功后 隐藏自身对话框
//                          _this.$router.push({path:"/system/goat",info:{haha:"山羊传递的信息"}});// router 跳转！！！
                        console.log(res);
                    })
                        .catch(function (error) { console.log(error);});
                }
            });
        }
    }
  }
</script>

<style scoped>

</style>
