 

 // main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {
     
     var myFacebookToken = 'EAACEdEose0cBAI8T73CfbTxZAx3Vi090wZAY6SXOFsplazdn3LobRWloAZA2cNkbmlSZBsEU10oqakQQwg2TN10nPPw0ZCUqEd9hRZC0qrZA6gpWTzoYvM8jAYpuXPE9Gg35CmBibSt8E7G5EQIx8hjqNWdzhaGVgZAMFJ0hJTr48aR9gPPmWc0MTk0wEHUhDuMZD';
  $(".loader").hide();

         function getFacebookInfo(){
    
 
   
          $.ajax('https://graph.facebook.com/me?fields=id,name,bio,birthday,relationship_status,hometown,favorite_athletes,picture.type(large),languages,education,email,work&access_token='+myFacebookToken,{

   
      
                success : function(response){
                  try
                  {
                    console.log(response);
                    console.log(typeof(response));
                    $("#name").html("Hi, I am "+response.name);
                    $("#myEmail").html(response.email);
                    $("#aboutMe").html(response.bio);
                    $("#birthday").html(response.birthday);
                    $("#Relationship").html(response.relationship_status);
                    $("#mypic").html('<img src='+response.picture.data.url+'>');

                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
                  
                    if(response.hometown !=null)
                     {    
                     $("#myHomeTown").html(response.hometown.name);
                     }

                    
                   if (response.work!=null)
                       {  
                           $("#myWork").append(response.work[0].employer.name);
                           if(response.work[0].location!=null)
                           {
                              $("#loc").append(response.work[0].location.name);
                           }
                           if(response.work[0].position!=null)
                           {
                           $("#pos").append(response.work[0].position.name);                        
                          }
                   
                       }

                        for(i in response.education)
                    {   
                       
                       if(response.education[i].type=='College')
                       { 
                        $("#Education2").text(response.education[1].school.name);
                       }
                       else{
                  
                         $("#Education1").text(response.education[0].school.name);
                       }
            
                       
                    }

                     for(i in response.languages)
                     {
                      $("#languages").append(response.languages[i].name);
                      $("#languages").append("  ");
                     }

                     for (i in response.favorite_athletes)
                     {
                          $("#Ath").append(response.favorite_athletes[i].name);
                          $("#Ath").append(",   ");
                      }

              }

          catch(e)
{   
         if (e.name =='TypeError')
         {
          alert("Sometrhing went wrong");
          alert("Error in reading information from FB : "+e.message);
        }
         else
           alert("e.message"); 
        }

finally
{
  console.log("Results Displayed");
}
                },

               error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    console.log(errorMessage);
              
},

       
                timeout :3000,

                beforeSend : function(){  

                    $('.loader').show();

                },

                complete : function(){

                   $('.loader').hide();

                }
            }//end argument list 



        );// end ajax call 



    }// end get facebook info

    $("#facebookBtn").on('click',getFacebookInfo)
      


  });



