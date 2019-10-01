using DrillingRequisition.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace DrillingRequisition.Controllers
{
    public class DataAccess
    {
        
        public string SaveData( MERGED_Data dr)
        {
            using (var contextAR = new TestDB_UpdatedEntities())
            {
                try
                {
                    contextAR.MERGED_Data.Add(dr);
                     contextAR.SaveChanges();
                    return "saved";
                }
                catch (Exception ex)
                {
                    return ex.ToString();
                }
            }
        }
        public string DeleteRecord(double unitnm)
        {
            using (var contextAR = new TestDB_UpdatedEntities())
            {
                try
                {
                    var data = contextAR.MERGED_Data.Where(i => i.UNITID == unitnm).FirstOrDefault();
                    contextAR.MERGED_Data.Remove(data);
                    contextAR.SaveChanges();
                    return "saved";
                }
                catch (Exception ex)
                {
                    return ex.ToString();
                }
            }
        }

        public string UpdateData( MERGED_Data dr)
        {
            return "";
        //    using (var contextAR = new NEWFIMSDBEntities())
        //    {
        //        try
        //        {
        //            Drilling_Requisition or_dara = dr;
        //            var context = new NEWFIMSDBEntities();
        //            Drilling_Requisition obj = context.Drilling_Requisition.Where(r => r.dr_id == dr.dr_id).First();
        //            string chng = "";
        //            if (obj.requestDate != dr.requestDate) { chng = chng + "~Req_date_O=" + obj.requestDate + ",N=" + dr.requestDate; }
        //            if (obj.techOnOsite != dr.techOnOsite) { chng = chng + "~Req_date_O=" + obj.techOnOsite + ",N=" + dr.techOnOsite; }
        //            if (obj.techContactNo != dr.techContactNo) { chng = chng + "~techContactNo_O=" + obj.techContactNo + ",N=" + dr.techContactNo; }
        //            if (obj.workingHr != dr.workingHr) { chng = chng + "~workingHr_O=" + obj.workingHr + ",N=" + dr.workingHr; }
        //            if (obj.clientContact != dr.clientContact) { chng = chng + "~clientContact_O=" + obj.clientContact + ",N=" + dr.clientContact; }
        //            if (obj.totalBoreholes != dr.totalBoreholes) { chng = chng + "~totalBoreholes_O=" + obj.totalBoreholes + ",N=" + dr.totalBoreholes; }
        //            if (obj.boreholesDepth != dr.boreholesDepth) { chng = chng + "~boreholesDepth_O=" + obj.boreholesDepth + ",N=" + dr.boreholesDepth; }
        //            if (obj.soilSampling != dr.soilSampling) { chng = chng + "~soilSampling_O=" + obj.soilSampling + ",N=" + dr.soilSampling; }
        //            if (obj.totalMonitoringWell != dr.totalMonitoringWell) { chng = chng + "~totalMonitoringWell_O=" + obj.totalMonitoringWell + ",N=" + dr.totalMonitoringWell; }
        //            if (obj.monitorWellDepth != dr.monitorWellDepth) { chng = chng + "~monitorWellDepth_O=" + obj.monitorWellDepth + ",N=" + dr.monitorWellDepth; }
        //            if (obj.additionalNote != dr.additionalNote) { chng = chng + "~additionalNote_O=" + obj.additionalNote + ",N=" + dr.additionalNote; }
        //            if (obj.flushMountWellCap != dr.flushMountWellCap) { chng = chng + "~flushMountWellCap_O=" + obj.flushMountWellCap + ",N=" + dr.flushMountWellCap; }
        //            if (obj.aboveGround != dr.aboveGround) { chng = chng + "~aboveGround_O=" + obj.aboveGround + ",N=" + dr.aboveGround; }
        //            if (obj.numberOfScreen != dr.numberOfScreen) { chng = chng + "~numberOfScreen_O=" + obj.numberOfScreen + ",N=" + dr.numberOfScreen; }
        //            if (obj.Asphalt != dr.Asphalt) { chng = chng + "~Asphalt_O=" + obj.Asphalt + ",N=" + dr.Asphalt; }
        //            if (obj.Concrete != dr.Concrete) { chng = chng + "~Concrete_O=" + obj.Concrete + ",N=" + dr.Concrete; }
        //            if (obj.Bentonite != dr.Bentonite) { chng = chng + "~Bentonite_O=" + obj.Bentonite + ",N=" + dr.Bentonite; }
        //            if (obj.Sand != dr.Sand) { chng = chng + "~Sand_O=" + obj.Sand + ",N=" + dr.Sand; }
        //            if (obj.scopeOfWork != dr.scopeOfWork) { chng = chng + "~scopeOfWork_O=" + obj.scopeOfWork + ",N=" + dr.scopeOfWork; }
        //            if (obj.monitoringWellInstallation_details != dr.monitoringWellInstallation_details) { chng = chng + "~monitoringWellInstallation_details_O=" + obj.monitoringWellInstallation_details + ",N=" + dr.monitoringWellInstallation_details; }
        //            if (obj.undergroundServices != dr.undergroundServices) { chng = chng + "~undergroundServices_O=" + obj.undergroundServices + ",N=" + dr.undergroundServices; }
        //            if (obj.wellDevpPurgWaterSampling != dr.wellDevpPurgWaterSampling) { chng = chng + "~wellDevpPurgWaterSampling_O=" + obj.wellDevpPurgWaterSampling + ",N=" + dr.wellDevpPurgWaterSampling; }
        //            if (obj.speicalInstruction != dr.speicalInstruction) { chng = chng + "~speicalInstruction_O=" + obj.speicalInstruction + ",N=" + dr.speicalInstruction; }
        //            if (obj.sendRequest != dr.sendRequest) { chng = chng + "~sendRequest_O=" + obj.sendRequest + ",N=" + dr.sendRequest; }
        //            context.Entry(obj).CurrentValues.SetValues(dr);
        //            context.SaveChanges();
        //            if (chng != "") { UserActionLog(userId, DateTime.Now, "Modify", "NEWFIMSDB.Drilling_Requisition", chng, "Prj=" + dr.prjno + "_drId=" + dr.dr_id + "_Date" + DateTime.Now.ToString()); }
        //            return "saved";
        //        }
        //        catch (Exception ex)
        //        {
        //            return ex.ToString();
        //        }
        //    }
        }
       
        public List<MERGED_Data> GetAllData()
        {

         
            using (var contextAR = new TestDB_UpdatedEntities())
            {
                try
                {

                    return contextAR.MERGED_Data.OrderByDescending(x => x.UNITID).ToList();
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }
        public MERGED_Data getAllProjectDetails(double unitnm)
        {
            using (var contextAR = new TestDB_UpdatedEntities())
            {
                try
                {
                    var data = contextAR.MERGED_Data.Where(i => i.UNITID == unitnm).FirstOrDefault();
                    return data;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }

        public List<MERGED_Data> GetAllDRFilter(string PrNo)
        {

            using (var contextAR = new TestDB_UpdatedEntities())
            {
                try
                {
                    return contextAR.MERGED_Data.Where(i => i.UNITID.ToString() == PrNo).OrderByDescending(x => x.UNITID).ToList();
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }
        
       
    }
}