using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ReactToolbox2.Models;
using System.Web;
using System.IO;
using ExcelDataReader;
using System.Collections.Specialized;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Collections;
using System.Collections.Generic;

using System.Collections.ObjectModel;

namespace ReactToolbox2.Controllers
{
    public class ReadExcelFileController : ApiController
    {
        // GET: ReadExcelFile
        public async Task<List<string>> PostAsync()
        {
            if (Request.Content.IsMimeMultipartContent())
            {
                IExcelDataReader reader = null;

                /*string uploadPath = HttpContext.Current.Server.MapPath("~/uploadsExcel");

                MultipartFormDataStreamProvider multiStream = new MultipartFormDataStreamProvider(uploadPath);
                await Request.Content.ReadAsMultipartAsync(multiStream);


                MultipartMemoryStreamProvider prvdr = multiStream.GetStream;

                ICollection<MultipartFileData> files = multiStream.FileData;
                HttpContent a = files[0];
                ;*/

                MyStreamProvide myStream = new MyStreamProvide();
                await Request.Content.ReadAsMultipartAsync(myStream);
                IList<HttpContent> files = myStream.Files;
                HttpContent file1 = files[0];
                Stream file1Stream = await file1.ReadAsStreamAsync();
                reader = ExcelReaderFactory.CreateOpenXmlReader(file1Stream);

                DataSet myResult = reader.AsDataSet();

                List < string > messages = new List<string>();
                DataTable dt = myResult.Tables[0];

                String result = "";

                foreach (DataRow row in dt.Rows)
                {
                    foreach (object item in row.ItemArray)
                    {
                        // read item
                        result += item.ToString();
                    }
                }
                while (reader.Read())
                {
                   // result += reader.GetData(0);
                   
                }
                messages.Add(result);

                return messages;
            }
            else
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Request!");
                throw new HttpResponseException(response);
            }
        }
        /*public IHttpActionResult PostReadExcelFileF(HttpPostedFileBase file) {

            Stream stream = file.InputStream;

            IExcelDataReader reader = null;
            reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
            String result = "";
            while (reader.Read())
            {   
                
                result += reader.GetString(0);
                //excelReader.GetInt32(0);
            }
            
            return Json(result);
        }*/
    }

    public class MyStreamProvide : MultipartStreamProvider {

        private NameValueCollection _formData = new NameValueCollection();
        private List<HttpContent> _fileContents = new List<HttpContent>();
        private Collection<bool> _isFormData = new Collection<bool>();

        public NameValueCollection FormData
        {
            get { return _formData; }
        }


        public List<HttpContent> Files
        {
            get { return _fileContents; }
        }
        public override Stream GetStream(HttpContent parent, HttpContentHeaders headers)
        {
            // For form data, Content-Disposition header is a requirement
            ContentDispositionHeaderValue contentDisposition = headers.ContentDisposition;
            if (contentDisposition != null)
            {
                // We will post process this as form data
                _isFormData.Add(String.IsNullOrEmpty(contentDisposition.FileName));

                return new MemoryStream();
            }

            // If no Content-Disposition header was present.
            throw new InvalidOperationException(string.Format("Did not find required '{0}' header field in MIME multipart body part..", "Content-Disposition"));
        }

        public override async Task ExecutePostProcessingAsync()
        {
            // Find instances of non-file HttpContents and read them asynchronously
            // to get the string content and then add that as form data
            for (int index = 0; index < Contents.Count; index++)
            {
                if (_isFormData[index])
                {
                    HttpContent formContent = Contents[index];
                    // Extract name from Content-Disposition header. We know from earlier that the header is present.
                    ContentDispositionHeaderValue contentDisposition = formContent.Headers.ContentDisposition;
                    string formFieldName = UnquoteToken(contentDisposition.Name) ?? String.Empty;

                    // Read the contents as string data and add to form data
                    string formFieldValue = await formContent.ReadAsStringAsync();
                    FormData.Add(formFieldName, formFieldValue);
                }
                else
                {
                    _fileContents.Add(Contents[index]);
                }
            }
        }

        private static string UnquoteToken(string token)
        {
            if (String.IsNullOrWhiteSpace(token))
            {
                return token;
            }

            if (token.StartsWith("\"", StringComparison.Ordinal) && token.EndsWith("\"", StringComparison.Ordinal) && token.Length > 1)
            {
                return token.Substring(1, token.Length - 2);
            }

            return token;
        }

    }
}