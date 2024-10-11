const express = require('express');
const router =  require('express').Router();
let Notifications = require("../../models/gimhani_event_models/Notification_model");

router.post('/notif/save', (req, res)=>{
    let newPost = new Notifications(req.body);
    newPost.save()
    .then(() => {
        return res.status(200).json({
            success: "Posts saved successfully"
        });
    })
    .catch((err) => {
        return res.status(400).json({
            error: err
        });
    });

        });

        router.get('/notifs', (req, res) => {
            // Retrieve all events from the database
            Notifications.find().exec()
              .then(notifications => {
                // If successful, send a JSON response with success status and the array of events
                return res.status(200).json({
                  success: true,
                  existingNotifications: notifications
                });
              })
              .catch(err => {
                // If there is an error, send a JSON response with error status and the error message
                return res.status(400).json({
                  error: err
                });
              });
          });

 router.delete('/notif/delete/:id', (req, res) => {
            Notifications.findByIdAndDelete(req.params.id)
                .then(() => {
                    return res.status(200).json({
                        success: "Notification deleted successfully"
                    });
                })
                .catch(err => {
                    return res.status(400).json({
                        error: err
                    });
                });
        });

        router.delete('/notif/tdelete/:tid', (req, res) => {
            const { tid } = req.params;
            Notifications.findOneAndDelete({ topicId: tid })
                .then((deletedNotification) => {
                    if (!deletedNotification) {
                        console.log("Notification not found for deletion");
                        return res.status(404).json({
                            error: "Notification not found"
                        });
                    }
                    console.log("Notification deleted successfully:", deletedNotification);
                    return res.status(200).json({
                        success: "Notification deleted successfully"
                    });
                })
                .catch(err => {
                    console.error("Error deleting notification:", err);
                    return res.status(400).json({
                        error: err
                    });
                });
        });
        
        


module.exports = router;