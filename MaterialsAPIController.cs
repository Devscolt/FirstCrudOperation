using InventoryManagement.BAL;
using InventoryManagement.BAL.Common;
using System;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InventoryManagement.API.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MaterialsAPIController : ApiController
    {
        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetMaterials(long materialId = 0)
        {

            try
            {
                MaterialsBA objMaterialBA = new MaterialsBA();
                DataSet ds = objMaterialBA.GetMaterials(materialId.CheckNull());

                return Request.CreateResponse(HttpStatusCode.OK, ds.Tables[0]);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new ErrorLogDetails() { Message = CommonMessages.DEFAULT_ERRORMESSAGE, StackTrace = ex.ToString() });
            }
        }

        /// <summary>
        /// Insert OR Update City Details
        /// </summary>
        /// <param name="objMaterialsBA"></param>
        /// <returns></returns>
        //[System.Web.Http.HttpPost]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage InsertUpdateMaterial(MaterialsBA objMaterialsBA)//[FromBody] string test
        {
            try
            {
                int value = objMaterialsBA.InsertUpdateMaterial(objMaterialsBA);
                return Request.CreateResponse(HttpStatusCode.OK, value);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new ErrorLogDetails() { Message = CommonMessages.DEFAULT_ERRORMESSAGE, StackTrace = ex.ToString() });
            }
        }
        /// <summary>
        /// Delete City Details
        /// </summary>
        /// <param name="CityId"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public HttpResponseMessage DeleteEmployee(long EmpId)
        {
            try
            {
                if (EmpId.CheckNull() > 0)
                {
                    EmployeeBA objEmployeeBA = new EmployeeBA();
                    Int32 retValue = objEmployeeBA.DeleteEmployee(EmpId);
                    if (retValue == -3)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, 3);
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, 1);
                    }

                }
                return Request.CreateResponse(HttpStatusCode.BadRequest, CommonMessages.InvalidInputMessage);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new ErrorLogDetails() { Message = CommonMessages.DEFAULT_ERRORMESSAGE, StackTrace = ex.ToString() });
            }
        }
        /// <summary>
        /// check exist duplication of city
        /// </summary>
        /// <param name="objEmployeeBA"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage CheckExistEmployee(EmployeeBA objEmployeeBA)
        {

            try
            {
                objEmployeeBA.ReturnCode = 999;

                int value = objEmployeeBA.InsertUpdateEmployee(objEmployeeBA);
                return Request.CreateResponse(HttpStatusCode.OK, value);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new ErrorLogDetails() { Message = CommonMessages.DEFAULT_ERRORMESSAGE, StackTrace = ex.ToString() });
            }
        }

    }
}
