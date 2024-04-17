import React from 'react'

 export const RelationInfo = ({ setStepper }) => {
  return (
    <div>
      <div className="flex justify-between">
                <div className="formGroup">
                <span className="registerTitle">Adress Details</span>
                <label>District *</label>
<select 
  className="registerInput"
  // value={district}
  // onChange={(event) => setDistrict(event.target.value)}
  required
>
  <option value="">Select District</option>
  <option value="Abbottabad">Abbottabad</option>
  <option value="Bahawalpur">Bahawalpur</option>
  <option value="Bannu">Bannu</option>
  <option value="Bhakkar">Bhakkar</option>
  <option value="Chakwal">Chakwal</option>
  <option value="Charsadda">Charsadda</option>
  <option value="Chiniot">Chiniot</option>
  <option value="Dadu">Dadu</option>
  <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
  <option value="Faisalabad">Faisalabad</option>
  <option value="Ghotki">Ghotki</option>
  <option value="Gujranwala">Gujranwala</option>
  <option value="Gujrat">Gujrat</option>
  <option value="Hafizabad">Hafizabad</option>
  <option value="Hyderabad">Hyderabad</option>
  <option value="Islamabad">Islamabad</option>
  <option value="Jacobabad">Jacobabad</option>
  <option value="Jhang">Jhang</option>
  <option value="Karachi">Karachi</option>
  <option value="Kasur">Kasur</option>
  <option value="Khairpur">Khairpur</option>
  <option value="Khanewal">Khanewal</option>
  <option value="Khushab">Khushab</option>
  <option value="Kohat">Kohat</option>
  <option value="Lahore">Lahore</option>
  <option value="Larkana">Larkana</option>
  <option value="Lodhran">Lodhran</option>
  <option value="Mandi Bahauddin">Mandi Bahauddin</option>
  <option value="Mansehra">Mansehra</option>
  <option value="Mardan">Mardan</option>
  <option value="Mianwali">Mianwali</option>
  <option value="Multan">Multan</option>
  <option value="Muzaffargarh">Muzaffargarh</option>
  <option value="Narowal">Narowal</option>
  <option value="Nawabshah">Nawabshah</option>
  <option value="Nowshera">Nowshera</option>
  <option value="Okara">Okara</option>
  <option value="Peshawar">Peshawar</option>
  <option value="Quetta">Quetta</option>
  <option value="Rahim Yar Khan">Rahim Yar Khan</option>
  <option value="Rajanpur">Rajanpur</option>
  <option value="Rawalpindi">Rawalpindi</option>
  <option value="Sahiwal">Sahiwal</option>
  <option value="Sargodha">Sargodha</option>
  <option value="Sheikhupura">Sheikhupura</option>
  <option value="Shikarpur">Shikarpur</option>
  <option value="Sialkot">Sialkot</option>
  <option value="Sukkur">Sukkur</option>
  <option value="Swabi">Swabi</option>
  <option value="Swat">Swat</option>
  <option value="Toba Tek Singh">Toba Tek Singh</option>
  <option value="Vehari">Vehari</option>
  {/* Add more districts as needed */}
</select>
<div className="formGroup">
                      
                      <label>Tehsil *</label>
                      <select
                        className="registerInput"
                        // value={tehsil}
                        // onChange={(event) => setTehsil(event.target.value)}
                        required
                      >
                        <option value="">Select Tehsil</option>
                        <option value="Depalpur">Depalpur</option>
                        {/* Add more tehsil options as needed */}
                      </select>
                      
                      {/* Candidate Postal Address */}
                      <label>Candidate Postal Address *</label>
                    <input
                      className="registerInput"
                      type="text"
                      placeholder="Enter Postal Address..."
                      // value={postalAddress}
                      // onChange={(event) => setPostalAddress(event.target.value)}
                      autoComplete="postal-address"
                      required
                    />
                      </div>
                    <label>Candidate Permanent Address *</label>
                  <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter Permanent Address..."
                    // value={permanentAddress}
                    // onChange={(event) =>
                      // setPermanentAddress(event.target.value)
                    // }
                    autoComplete="permanent-address"
                    required
                  />   
                  </div>
                  {/* <div className="formGroup">
                </div> */}
                <div className="formGroup">
                <span className="registerTitle">Reference Details</span>
                {/* Name of reference */}
        <label>Name of Reference *</label>
        <input
          className="registerInput"
          type="text"
          // value={nameOfReference}
          placeholder="Enter Name Reference..."
          // onChange={(event) => setNameOfReference(event.target.value)}
          required
        />
                  <label>Number of References *</label>
        <input
          className="registerInput"
          type="number"
          placeholder="Enter Number of References"
          // value={numberOfReferences}
          // onChange={(event) => setNumberOfReferences(event.target.value)}
          required
        />
        {/* Relation */}
        <label>Relation *</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter Relation"
          // value={relation}
          // onChange={(event) => setRelation(event.target.value)}
          required
        />
        
         {/* Other details regarding the reference */}
         <label>Other Details Regarding the Reference</label>
        <textarea
          className="registerInput"
          placeholder="Enter other details..."
          // value={otherDetails}
          // onChange={(event) => setOtherDetails(event.target.value)}
        />
                </div> 
              </div>









      <div className="flex justify-between">
            <button className="registerButton" onClick={() => setStepper(1)}>
              Previous Step
            </button>
            <button className="registerButton" onClick={() => setStepper(4)}>
              Next Step
            </button>
          </div>
    </div>

  )
}

