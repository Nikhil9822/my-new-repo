define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class generateToken extends ActionChain {


    async run(context) {
      const { $application, $constants, $variables, $functions } = context;

      const msalConfig = {
        auth: {
          clientId: "2a24551b-432a-4699-8592-9bbe80313651", // from Azure AD
          authority:  "https://login.microsoftonline.com/97525e9a-595d-472c-8248-0dc58f852d61",
          redirectUri: "https://equipritedev.oceaneering.com" // must match Azure redirect URI
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: false
        }
      };
          
      const msalInstance =  new window.msal.PublicClientApplication(msalConfig);

            try {
        // ---- Login Popup ---- //
        const loginResponse = await msalInstance.loginPopup({
          scopes: ["openid", "profile", "email", "User.Read"] // adjust scopes
        });

        // ---- Tokens ---- //
        const idToken = loginResponse.idToken;
        const accessToken = loginResponse.accessToken;

        console.log("ID Token:", idToken);
        console.log("Access Token:", accessToken);

        // ---- Decode ID Token ---- //
        const decoded = parseJwt(idToken);

        $application.variables.user = decoded.email;
        // $application.user.username =  decoded.email;
       
        console.log("Decoded User Claims:", $application.variables.user);

        // ---- Store in VBCS variable ---- //
        // $variables.jwttoken = idToken;
        // $variables.loggedInUser = decoded; // contains email, name, etc.
    
      } catch (err) {
        console.error("Login failed:", err);
      }
    let rolespath = '/Custom/EquipmentRite/UserRoles Report.xdo';
    
//       const generateBIPReportRequestPayloadParams = await $functions.generateBIPReportRequestPayload_params(rolespath, [
//   {
//     name: 'p_username',
//     value: "DNeredu@oceaneering.com",
//   },
// ]);
//

      const generateBIPReportRequestPayloadParams = await $functions.generateBIPReportRequestPayload_params(rolespath, [
  {
    name: 'p_username',
    value: $variables.user
  },
]);

      const response4 = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/postXmlpserverServicesExternalReportWSSService',
        body: generateBIPReportRequestPayloadParams,
      });
      const convertBIPSoapResponseToArray3 = await $functions.convertBIPSoapResponseToArray(response4.body);

//   const rolesdata = [
//   {
//     role_id: "300000006507108",
//     role_name: "OII EQUIPMENT MANAGER JR",
//     role_common_name: "OII_RT_EQP_ADMINISTRATOR_JR",
//     name: "dneredu@oceaneering.com",
//     userjobroles_pk: "dneredu@oceaneering.com_OII_RT_EQP_ADMINISTRATOR_JR"
//   }
// ];
      let rolesdata = convertBIPSoapResponseToArray3.filter(o => Object.keys(o).length);
      const navigationContent2 = await $functions.getNavigationContent(rolesdata);
      $application.variables.restrictednavTree = navigationContent2;
 
      const results = await Promise.all([
        async () => {
          let projectsPath='/Custom/EquipmentRite/projects_lov.xdo';

   const generateBIPReportRequestPayload = await $functions.generateBIPReportRequestPayload(projectsPath);

              const response2 = await Actions.callRest(context, {
                endpoint: 'fusion_cloud/postXmlpserverServicesExternalReportWSSService',
                body: generateBIPReportRequestPayload,
              });

              const convertBIPSoapResponseToArray = await $functions.convertBIPSoapResponseToArray(response2.body);
// debugger;
              $variables.projectsAdp.data = convertBIPSoapResponseToArray.filter(o => Object.keys(o).length);
        },
        async () => {
 let invlocationPath='/Custom/EquipmentRite/EQP_INV_ORG_LOC_RPT.xdo';
          const generateBIPReportRequestPayload2 = await $functions.generateBIPReportRequestPayload(invlocationPath);

          const response3 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/postXmlpserverServicesExternalReportWSSService',
            body: generateBIPReportRequestPayload2,
          });

          const convertBIPSoapResponseToArray2 = await $functions.convertBIPSoapResponseToArray(response3.body);

          $variables.invLocationAdp.data = convertBIPSoapResponseToArray2.filter(o => Object.keys(o).length);
          
          // debugger;
        },
        async () => {
           const response13 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_DashboardCount',
      });
      $variables.dashboardAdp.data = response13.body.items;

        },
      ].map(sequence => sequence()));
      function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
      }
      
      

      // const response1 = await Actions.callRest(context, {
      //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_USERS_JOB_ROLES1_0UsersJobRoles',
      //   uriParams: {
      //     'p_username':  $application.variables.user,
      //   },
      // });
      
// debugger;

      // const response1 = await Actions.callRest(context, {
      //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_USERS_JOB_ROLES1_0UsersJobRoles',
      //   uriParams: {
      //     'p_username':  "DNeredu@oceaneering.com",
      //   },
      // });
      
      // const navigationContent = await $application.functions.getNavigationContent(response1.body.items);

     

      // await $application.functions.getUsernameFromJwt($application.variables.jwt);

      // const response = await Actions.callRest(context, {
      //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_ASSET_GROUP1_0GetAssetgroupdetails',
      // });

      // $variables.assetGroupNumbersAdp.data = response.body.items;
            // ---- Helper function to decode JWT ---- //
      


      // debugger;



    }
  }

  return generateToken;
});
