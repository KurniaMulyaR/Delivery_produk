const Delivery = require('../models/Delivery');
const Schedule = require('../models/Schedule');
const Users = require('../models/Users');
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
    // viewSignin: async(req,res)=>{
    //     try {
    //         const alertMessage = req.flash('alertMessage');
    //         const alertStatus = req.flash('alertStatus');
    //         const alert = {
    //             message: alertMessage,
    //             status: alertStatus
    //         };
    //         if (req.session.user == null || req.session.user == undefined) {
    //             res.render('index', {
    //                 alert,
    //                 title: "Staycation | Signin"
    //             });
    //         } else {
    //             res.redirect('/admin/dashboard');
    //         }
    //     } catch (error) {
    //         res.redirect('/admin/signin');
    //     }
    // },

    // actionSignin: async (req,res) => {
    //     try {
    //         const { username, password } = req.body;
    //         const user = await Users.findOne({username: username});
    //         if (!user) {
    //              req.flash('alertMessage', 'User yang anda masukan tidak ada!!');
    //              req.flash('alertStatus', 'danger');
    //              res.redirect('/admin/signin');
    //         }

    //         const isPasswordMatch = await bcrypt.compare(password, user.password);
    //         if (!isPasswordMatch) {
    //             req.flash('alertMessage', 'Password yang anda masukan Salah!!');
    //             req.flash('alertStatus', 'danger');
    //             res.redirect('/admin/signin');
                
    //         }
            
    //         req.session.user = {
    //             id: user.id,
    //             username: user.username 
    //         }

    //         res.redirect('/admin/dashboard');

    //     } catch (error) {
    //          res.redirect('/admin/signin');
    //     }
    // },

     viewdelivery: async (req, res) => {
         try {
             const delivery = await Delivery.find()
                 .populate({
                     path: 'scheduleId',
                     select: 'id scheduleUrl'
                 });
             const alertMessage = req.flash('alertMessage');
             const alertStatus = req.flash('alertStatus');
             const alert = {
                 message: alertMessage,
                 status: alertStatus
             };
             res.render('admin/delivery/view_delivery.ejs', {
                 title: "Surya Mold Tech | Delivery",
                 alert,
                 delivery
             });
         } catch (error) {
             req.flash('alertMessage', `${error.message}`);
             req.flash('alertStatus', 'danger');
             res.redirect('admin/delivery/view_delivery.ejs');
         }
     }, 

    addDelivery: async (req, res) => {
        try {
            const { tanggal } = req.body;
            // console.log(name);
            await Delivery.create({tanggal});
            req.flash('alertMessage', 'Success Menambah Tanggal Pengiriman');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/delivery');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/delivery');
        }
    },

     editDelivery: async (req, res) => {
         try {
             const {
                 id,
                 tanggal
             } = req.body;
             const delivery = await Delivery.findOne({
                 _id: id
             });
             delivery.tanggal = tanggal;
             await delivery.save();
             req.flash('alertMessage', 'Success Update Tanggal Pengiriman');
             req.flash('alertStatus', 'success');
             res.redirect('/admin/delivery');
         } catch (error) {
             req.flash('alertMessage', `${error.message}`);
             req.flash('alertStatus', 'danger');
             res.redirect('/admin/delivery');
         }
     },

      deleteDelivery: async (req, res) => {
          try {
              const {
                  id
              } = req.params;
              const delivery = await Delivery.findOne({
                  _id: id
              });
              await delivery.remove();
              req.flash('alertMessage', 'Success Delete Tanggal Pengiriman');
              req.flash('alertStatus', 'success');
              res.redirect('/admin/delivery');
          } catch (error) {
              req.flash('alertMessage', `${error.message}`);
              req.flash('alertStatus', 'danger');
              res.redirect('/admin/delivery');
          }
      },

      viewSchedule: async (req, res) => {
          const {
              deliveryId
          } = req.params;
          try {
              const alertMessage = req.flash('alertMessage');
              const alertStatus = req.flash('alertStatus');
              const alert = {
                  message: alertMessage,
                  status: alertStatus
              };
              const schedule = await Schedule.find({
                  deliveryId: deliveryId
              });
              const delivery = await Delivery.findOne(
                  {_id: deliveryId}
              );
              res.render('admin/delivery/schedule/view_schedule', {
                  title: 'Surya Mold Tech | Schedule',
                  alert,
                  delivery, 
                  schedule,
                  action: 'view',
                  deliveryId
              })
          } catch (error) {
              req.flash('alertMessage', `${error.message}`);
              req.flash('alertStatus', 'danger');
              res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
          }
      },

      addSchedule: async (req, res) => {
          const {
              sm,
              name,
              keterangan,
              status,
              kendaraan,
              driver,
              tujuan,
              deliveryId
          } = req.body;
          try {
              const schedule = await Schedule.create({
                  sm,
                  name,
                  keterangan,
                  status,
                  kendaraan,
                  driver,
                  tujuan,
                  deliveryId
              });
              const delivery = await Delivery.findOne({
                  _id: deliveryId
              });
              delivery.scheduleId.push({
                  _id: schedule._id
              });
              await delivery.save();
              req.flash('alertMessage', 'Success Add Schedule');
              req.flash('alertStatus', 'success');
              res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
              

          } catch (error) {
              req.flash('alertMessage', `${error.message}`);
              req.flash('alertStatus', 'danger');
              res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
          }
      },

    showEditSchedule: async (req, res) => {
        try {
            const {
                id,
                deliveryId
            } = req.params;
            const schedule = await Schedule.findOne({
                    _id: id
                });
                const delivery = await Delivery.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMessage,
                status: alertStatus
            };
            res.render('admin/delivery/schedule/view_schedule', {
                title: "Staycation | Edit Schedule",
                alert,
                schedule,
                delivery,
                deliveryId,
                action: 'edit'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
        }

    },

      editSchedule: async (req, res) => {
          const {
              id,
              sm,
              name,
              keterangan,
              status,
              kendaraan,
              driver,
              tujuan,
              deliveryId
          } = req.body;
          try {
              const schedule = await Schedule.findOne({
                  _id: id
              }); 
                schedule.sm = sm;
                schedule.name = name;
                schedule.keterangan = keterangan;
                schedule.kendaraan = kendaraan;
                schedule.driver = driver;
                schedule.tujuan = tujuan;
                schedule.status = status;
                await schedule.save();
                req.flash('alertMessage', 'Success Update Schedule');
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
          } catch (error) {
              req.flash('alertMessage', `${error.message}`);
              req.flash('alertStatus', 'danger');
              res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
          }
      },

      deleteSchedule: async (req, res) => {
        const { id, deliveryId } = req.params;
        try {
            const schedule = await Schedule.findOne({ _id: id });
            const delivery = await Delivery.findOne({ _id: deliveryId }).populate('scheduleId');
            for (let i = 0; i < delivery.scheduleId.length; i++) {
                if(delivery.scheduleId[i]._id.toString() === schedule._id.toString()){
                    delivery.scheduleId.pull({ _id : schedule._id });
                    await delivery.save();
                }
                
            }
            await schedule.remove();
            req.flash('alertMessage', 'Success Delete Schedule');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/delivery/show-schedule/${deliveryId}`);
        }
    },

    
    actionLogout: (req, res)=>{
        req.session.destroy();
        res.redirect('/admin/signin')
    },

    viewDashboard: (req, res) =>{
        try {
            res.render('admin/dashboard/view_dashboard', {
                title: "Staycation | Dashboard",
                user:req.session.user
            });
        } catch (error) {
            
        }
    },
    viewMiling: (req, res) =>{
        try {
            res.render('admin/mechine/miling', {
                title: "Staycation | Dashboard"
            });
        } catch (error) {
            
        }
    },
      
}