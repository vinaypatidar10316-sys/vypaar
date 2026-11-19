export interface IndianCityEntry {
  city: string;
  state: string;
}

export interface PincodeLookupResult {
  city: string;
  state: string;
  source: 'exact' | 'prefix' | 'api';
}

/**
 * Comprehensive All-India directory of cities & district headquarters across all 28 states and 8 union territories.
 */
export const INDIAN_CITIES: IndianCityEntry[] = [
  // Andaman & Nicobar Islands
  { city: 'Port Blair', state: 'Andaman & Nicobar Islands' },

  // Andhra Pradesh
  { city: 'Adoni', state: 'Andhra Pradesh' },
  { city: 'Amaravati', state: 'Andhra Pradesh' },
  { city: 'Anantapur', state: 'Andhra Pradesh' },
  { city: 'Bhimavaram', state: 'Andhra Pradesh' },
  { city: 'Chittoor', state: 'Andhra Pradesh' },
  { city: 'Eluru', state: 'Andhra Pradesh' },
  { city: 'Guntur', state: 'Andhra Pradesh' },
  { city: 'Kadapa', state: 'Andhra Pradesh' },
  { city: 'Kakinada', state: 'Andhra Pradesh' },
  { city: 'Kurnool', state: 'Andhra Pradesh' },
  { city: 'Machilipatnam', state: 'Andhra Pradesh' },
  { city: 'Nellore', state: 'Andhra Pradesh' },
  { city: 'Ongole', state: 'Andhra Pradesh' },
  { city: 'Proddatur', state: 'Andhra Pradesh' },
  { city: 'Rajahmundry', state: 'Andhra Pradesh' },
  { city: 'Srikakulam', state: 'Andhra Pradesh' },
  { city: 'Tenali', state: 'Andhra Pradesh' },
  { city: 'Tirupati', state: 'Andhra Pradesh' },
  { city: 'Vijayawada', state: 'Andhra Pradesh' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { city: 'Vizianagaram', state: 'Andhra Pradesh' },

  // Arunachal Pradesh
  { city: 'Itanagar', state: 'Arunachal Pradesh' },
  { city: 'Naharlagun', state: 'Arunachal Pradesh' },
  { city: 'Pasighat', state: 'Arunachal Pradesh' },
  { city: 'Tawang', state: 'Arunachal Pradesh' },

  // Assam
  { city: 'Bongaigaon', state: 'Assam' },
  { city: 'Dibrugarh', state: 'Assam' },
  { city: 'Guwahati', state: 'Assam' },
  { city: 'Jorhat', state: 'Assam' },
  { city: 'Nagaon', state: 'Assam' },
  { city: 'Silchar', state: 'Assam' },
  { city: 'Tezpur', state: 'Assam' },
  { city: 'Tinsukia', state: 'Assam' },

  // Bihar
  { city: 'Arrah', state: 'Bihar' },
  { city: 'Begusarai', state: 'Bihar' },
  { city: 'Bhagalpur', state: 'Bihar' },
  { city: 'Bihar Sharif', state: 'Bihar' },
  { city: 'Chapra', state: 'Bihar' },
  { city: 'Darbhanga', state: 'Bihar' },
  { city: 'Gaya', state: 'Bihar' },
  { city: 'Hajipur', state: 'Bihar' },
  { city: 'Katihar', state: 'Bihar' },
  { city: 'Motihari', state: 'Bihar' },
  { city: 'Munger', state: 'Bihar' },
  { city: 'Muzaffarpur', state: 'Bihar' },
  { city: 'Patna', state: 'Bihar' },
  { city: 'Purnia', state: 'Bihar' },
  { city: 'Saharsa', state: 'Bihar' },
  { city: 'Samastipur', state: 'Bihar' },
  { city: 'Sasaram', state: 'Bihar' },
  { city: 'Siwan', state: 'Bihar' },

  // Chandigarh
  { city: 'Chandigarh', state: 'Chandigarh' },

  // Chhattisgarh
  { city: 'Ambikapur', state: 'Chhattisgarh' },
  { city: 'Bhilai', state: 'Chhattisgarh' },
  { city: 'Bilaspur', state: 'Chhattisgarh' },
  { city: 'Durg', state: 'Chhattisgarh' },
  { city: 'Jagdalpur', state: 'Chhattisgarh' },
  { city: 'Korba', state: 'Chhattisgarh' },
  { city: 'Raigarh', state: 'Chhattisgarh' },
  { city: 'Raipur', state: 'Chhattisgarh' },
  { city: 'Rajnandgaon', state: 'Chhattisgarh' },

  // Dadra & Nagar Haveli and Daman & Diu
  { city: 'Daman', state: 'Dadra & Nagar Haveli and Daman & Diu' },
  { city: 'Diu', state: 'Dadra & Nagar Haveli and Daman & Diu' },
  { city: 'Silvassa', state: 'Dadra & Nagar Haveli and Daman & Diu' },

  // Delhi
  { city: 'Delhi', state: 'Delhi' },
  { city: 'New Delhi', state: 'Delhi' },

  // Goa
  { city: 'Mapusa', state: 'Goa' },
  { city: 'Margao', state: 'Goa' },
  { city: 'Panaji', state: 'Goa' },
  { city: 'Ponda', state: 'Goa' },
  { city: 'Vasco da Gama', state: 'Goa' },

  // Gujarat
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Amreli', state: 'Gujarat' },
  { city: 'Anand', state: 'Gujarat' },
  { city: 'Ankleshwar', state: 'Gujarat' },
  { city: 'Bardoli', state: 'Gujarat' },
  { city: 'Bharuch', state: 'Gujarat' },
  { city: 'Bhavnagar', state: 'Gujarat' },
  { city: 'Bhuj', state: 'Gujarat' },
  { city: 'Botad', state: 'Gujarat' },
  { city: 'Dahod', state: 'Gujarat' },
  { city: 'Deesa', state: 'Gujarat' },
  { city: 'Gandhidham', state: 'Gujarat' },
  { city: 'Gandhinagar', state: 'Gujarat' },
  { city: 'Godhra', state: 'Gujarat' },
  { city: 'Gondal', state: 'Gujarat' },
  { city: 'Himmatnagar', state: 'Gujarat' },
  { city: 'Jamnagar', state: 'Gujarat' },
  { city: 'Jetpur', state: 'Gujarat' },
  { city: 'Junagadh', state: 'Gujarat' },
  { city: 'Kalol', state: 'Gujarat' },
  { city: 'Mahesana', state: 'Gujarat' },
  { city: 'Morbi', state: 'Gujarat' },
  { city: 'Nadiad', state: 'Gujarat' },
  { city: 'Navsari', state: 'Gujarat' },
  { city: 'Palanpur', state: 'Gujarat' },
  { city: 'Patan', state: 'Gujarat' },
  { city: 'Porbandar', state: 'Gujarat' },
  { city: 'Rajkot', state: 'Gujarat' },
  { city: 'Surat', state: 'Gujarat' },
  { city: 'Surendranagar', state: 'Gujarat' },
  { city: 'Vadodara', state: 'Gujarat' },
  { city: 'Valsad', state: 'Gujarat' },
  { city: 'Vapi', state: 'Gujarat' },
  { city: 'Veraval', state: 'Gujarat' },

  // Haryana
  { city: 'Ambala', state: 'Haryana' },
  { city: 'Bahadurgarh', state: 'Haryana' },
  { city: 'Bhiwani', state: 'Haryana' },
  { city: 'Faridabad', state: 'Haryana' },
  { city: 'Gurugram', state: 'Haryana' },
  { city: 'Hisar', state: 'Haryana' },
  { city: 'Jind', state: 'Haryana' },
  { city: 'Kaithal', state: 'Haryana' },
  { city: 'Karnal', state: 'Haryana' },
  { city: 'Kurukshetra', state: 'Haryana' },
  { city: 'Panchkula', state: 'Haryana' },
  { city: 'Panipat', state: 'Haryana' },
  { city: 'Rewari', state: 'Haryana' },
  { city: 'Rohtak', state: 'Haryana' },
  { city: 'Sirsa', state: 'Haryana' },
  { city: 'Sonipat', state: 'Haryana' },
  { city: 'Yamunanagar', state: 'Haryana' },

  // Himachal Pradesh
  { city: 'Baddi', state: 'Himachal Pradesh' },
  { city: 'Dharamshala', state: 'Himachal Pradesh' },
  { city: 'Hamirpur', state: 'Himachal Pradesh' },
  { city: 'Kullu', state: 'Himachal Pradesh' },
  { city: 'Manali', state: 'Himachal Pradesh' },
  { city: 'Mandi', state: 'Himachal Pradesh' },
  { city: 'Shimla', state: 'Himachal Pradesh' },
  { city: 'Solan', state: 'Himachal Pradesh' },
  { city: 'Una', state: 'Himachal Pradesh' },

  // Jammu & Kashmir
  { city: 'Anantnag', state: 'Jammu & Kashmir' },
  { city: 'Baramulla', state: 'Jammu & Kashmir' },
  { city: 'Jammu', state: 'Jammu & Kashmir' },
  { city: 'Kathua', state: 'Jammu & Kashmir' },
  { city: 'Srinagar', state: 'Jammu & Kashmir' },
  { city: 'Udhampur', state: 'Jammu & Kashmir' },

  // Jharkhand
  { city: 'Bokaro', state: 'Jharkhand' },
  { city: 'Deoghar', state: 'Jharkhand' },
  { city: 'Dhanbad', state: 'Jharkhand' },
  { city: 'Dumka', state: 'Jharkhand' },
  { city: 'Giridih', state: 'Jharkhand' },
  { city: 'Hazaribagh', state: 'Jharkhand' },
  { city: 'Jamshedpur', state: 'Jharkhand' },
  { city: 'Phusro', state: 'Jharkhand' },
  { city: 'Ramgarh', state: 'Jharkhand' },
  { city: 'Ranchi', state: 'Jharkhand' },

  // Karnataka
  { city: 'Bagalkot', state: 'Karnataka' },
  { city: 'Ballari', state: 'Karnataka' },
  { city: 'Belagavi', state: 'Karnataka' },
  { city: 'Bengaluru', state: 'Karnataka' },
  { city: 'Bidar', state: 'Karnataka' },
  { city: 'Chikkamagaluru', state: 'Karnataka' },
  { city: 'Chitradurga', state: 'Karnataka' },
  { city: 'Davanagere', state: 'Karnataka' },
  { city: 'Gadag', state: 'Karnataka' },
  { city: 'Hassan', state: 'Karnataka' },
  { city: 'Hosapete', state: 'Karnataka' },
  { city: 'Hubballi-Dharwad', state: 'Karnataka' },
  { city: 'Kalaburagi', state: 'Karnataka' },
  { city: 'Kolar', state: 'Karnataka' },
  { city: 'Mandya', state: 'Karnataka' },
  { city: 'Mangaluru', state: 'Karnataka' },
  { city: 'Mysuru', state: 'Karnataka' },
  { city: 'Raichur', state: 'Karnataka' },
  { city: 'Shivamogga', state: 'Karnataka' },
  { city: 'Tumakuru', state: 'Karnataka' },
  { city: 'Udupi', state: 'Karnataka' },
  { city: 'Vijayapura', state: 'Karnataka' },

  // Kerala
  { city: 'Alappuzha', state: 'Kerala' },
  { city: 'Kannur', state: 'Kerala' },
  { city: 'Kasaragod', state: 'Kerala' },
  { city: 'Kochi', state: 'Kerala' },
  { city: 'Kollam', state: 'Kerala' },
  { city: 'Kottayam', state: 'Kerala' },
  { city: 'Kozhikode', state: 'Kerala' },
  { city: 'Malappuram', state: 'Kerala' },
  { city: 'Palakkad', state: 'Kerala' },
  { city: 'Pathanamthitta', state: 'Kerala' },
  { city: 'Thiruvananthapuram', state: 'Kerala' },
  { city: 'Thrissur', state: 'Kerala' },

  // Ladakh
  { city: 'Kargil', state: 'Ladakh' },
  { city: 'Leh', state: 'Ladakh' },

  // Lakshadweep
  { city: 'Kavaratti', state: 'Lakshadweep' },

  // Madhya Pradesh
  { city: 'Betul', state: 'Madhya Pradesh' },
  { city: 'Bhopal', state: 'Madhya Pradesh' },
  { city: 'Burhanpur', state: 'Madhya Pradesh' },
  { city: 'Chhatarpur', state: 'Madhya Pradesh' },
  { city: 'Chhindwara', state: 'Madhya Pradesh' },
  { city: 'Damoh', state: 'Madhya Pradesh' },
  { city: 'Dewas', state: 'Madhya Pradesh' },
  { city: 'Guna', state: 'Madhya Pradesh' },
  { city: 'Gwalior', state: 'Madhya Pradesh' },
  { city: 'Hoshangabad', state: 'Madhya Pradesh' },
  { city: 'Indore', state: 'Madhya Pradesh' },
  { city: 'Itarsi', state: 'Madhya Pradesh' },
  { city: 'Jabalpur', state: 'Madhya Pradesh' },
  { city: 'Katni', state: 'Madhya Pradesh' },
  { city: 'Khandwa', state: 'Madhya Pradesh' },
  { city: 'Khargone', state: 'Madhya Pradesh' },
  { city: 'Mandsaur', state: 'Madhya Pradesh' },
  { city: 'Morena', state: 'Madhya Pradesh' },
  { city: 'Neemuch', state: 'Madhya Pradesh' },
  { city: 'Ratlam', state: 'Madhya Pradesh' },
  { city: 'Rewa', state: 'Madhya Pradesh' },
  { city: 'Sagar', state: 'Madhya Pradesh' },
  { city: 'Satna', state: 'Madhya Pradesh' },
  { city: 'Sehore', state: 'Madhya Pradesh' },
  { city: 'Shivpuri', state: 'Madhya Pradesh' },
  { city: 'Singrauli', state: 'Madhya Pradesh' },
  { city: 'Ujjain', state: 'Madhya Pradesh' },
  { city: 'Vidisha', state: 'Madhya Pradesh' },

  // Maharashtra
  { city: 'Ahmednagar', state: 'Maharashtra' },
  { city: 'Akola', state: 'Maharashtra' },
  { city: 'Amravati', state: 'Maharashtra' },
  { city: 'Baramati', state: 'Maharashtra' },
  { city: 'Beed', state: 'Maharashtra' },
  { city: 'Bhiwandi', state: 'Maharashtra' },
  { city: 'Bhusawal', state: 'Maharashtra' },
  { city: 'Chandrapur', state: 'Maharashtra' },
  { city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  { city: 'Dhule', state: 'Maharashtra' },
  { city: 'Ichalkaranji', state: 'Maharashtra' },
  { city: 'Jalgaon', state: 'Maharashtra' },
  { city: 'Jalna', state: 'Maharashtra' },
  { city: 'Kalyan-Dombivli', state: 'Maharashtra' },
  { city: 'Kolhapur', state: 'Maharashtra' },
  { city: 'Latur', state: 'Maharashtra' },
  { city: 'Malegaon', state: 'Maharashtra' },
  { city: 'Mira-Bhayandar', state: 'Maharashtra' },
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Nanded', state: 'Maharashtra' },
  { city: 'Nashik', state: 'Maharashtra' },
  { city: 'Navi Mumbai', state: 'Maharashtra' },
  { city: 'Osmanabad', state: 'Maharashtra' },
  { city: 'Palghar', state: 'Maharashtra' },
  { city: 'Panvel', state: 'Maharashtra' },
  { city: 'Parbhani', state: 'Maharashtra' },
  { city: 'Pimpri-Chinchwad', state: 'Maharashtra' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Ratnagiri', state: 'Maharashtra' },
  { city: 'Sangli', state: 'Maharashtra' },
  { city: 'Satara', state: 'Maharashtra' },
  { city: 'Solapur', state: 'Maharashtra' },
  { city: 'Thane', state: 'Maharashtra' },
  { city: 'Ulhasnagar', state: 'Maharashtra' },
  { city: 'Vasai-Virar', state: 'Maharashtra' },
  { city: 'Wardha', state: 'Maharashtra' },
  { city: 'Yavatmal', state: 'Maharashtra' },

  // Manipur
  { city: 'Imphal', state: 'Manipur' },

  // Meghalaya
  { city: 'Shillong', state: 'Meghalaya' },
  { city: 'Tura', state: 'Meghalaya' },

  // Mizoram
  { city: 'Aizawl', state: 'Mizoram' },

  // Nagaland
  { city: 'Dimapur', state: 'Nagaland' },
  { city: 'Kohima', state: 'Nagaland' },

  // Odisha
  { city: 'Balasore', state: 'Odisha' },
  { city: 'Baripada', state: 'Odisha' },
  { city: 'Berhampur', state: 'Odisha' },
  { city: 'Bhubaneswar', state: 'Odisha' },
  { city: 'Cuttack', state: 'Odisha' },
  { city: 'Jharsuguda', state: 'Odisha' },
  { city: 'Puri', state: 'Odisha' },
  { city: 'Rourkela', state: 'Odisha' },
  { city: 'Sambalpur', state: 'Odisha' },

  // Puducherry
  { city: 'Karaikal', state: 'Puducherry' },
  { city: 'Puducherry', state: 'Puducherry' },

  // Punjab
  { city: 'Abohar', state: 'Punjab' },
  { city: 'Amritsar', state: 'Punjab' },
  { city: 'Barnala', state: 'Punjab' },
  { city: 'Batala', state: 'Punjab' },
  { city: 'Bathinda', state: 'Punjab' },
  { city: 'Firozpur', state: 'Punjab' },
  { city: 'Hoshiarpur', state: 'Punjab' },
  { city: 'Jalandhar', state: 'Punjab' },
  { city: 'Kapurthala', state: 'Punjab' },
  { city: 'Khanna', state: 'Punjab' },
  { city: 'Ludhiana', state: 'Punjab' },
  { city: 'Moga', state: 'Punjab' },
  { city: 'Mohali', state: 'Punjab' },
  { city: 'Pathankot', state: 'Punjab' },
  { city: 'Patiala', state: 'Punjab' },
  { city: 'Phagwara', state: 'Punjab' },
  { city: 'Sangrur', state: 'Punjab' },

  // Rajasthan
  { city: 'Ajmer', state: 'Rajasthan' },
  { city: 'Alwar', state: 'Rajasthan' },
  { city: 'Banswara', state: 'Rajasthan' },
  { city: 'Barmer', state: 'Rajasthan' },
  { city: 'Beawar', state: 'Rajasthan' },
  { city: 'Bharatpur', state: 'Rajasthan' },
  { city: 'Bhilwara', state: 'Rajasthan' },
  { city: 'Bhiwadi', state: 'Rajasthan' },
  { city: 'Bikaner', state: 'Rajasthan' },
  { city: 'Chittorgarh', state: 'Rajasthan' },
  { city: 'Churu', state: 'Rajasthan' },
  { city: 'Hanumangarh', state: 'Rajasthan' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Jaisalmer', state: 'Rajasthan' },
  { city: 'Jhalawar', state: 'Rajasthan' },
  { city: 'Jhunjhunu', state: 'Rajasthan' },
  { city: 'Jodhpur', state: 'Rajasthan' },
  { city: 'Kishangarh', state: 'Rajasthan' },
  { city: 'Kota', state: 'Rajasthan' },
  { city: 'Nagaur', state: 'Rajasthan' },
  { city: 'Pali', state: 'Rajasthan' },
  { city: 'Sikar', state: 'Rajasthan' },
  { city: 'Sri Ganganagar', state: 'Rajasthan' },
  { city: 'Tonk', state: 'Rajasthan' },
  { city: 'Udaipur', state: 'Rajasthan' },

  // Sikkim
  { city: 'Gangtok', state: 'Sikkim' },
  { city: 'Namchi', state: 'Sikkim' },

  // Tamil Nadu
  { city: 'Ambattur', state: 'Tamil Nadu' },
  { city: 'Avadi', state: 'Tamil Nadu' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Cuddalore', state: 'Tamil Nadu' },
  { city: 'Dindigul', state: 'Tamil Nadu' },
  { city: 'Erode', state: 'Tamil Nadu' },
  { city: 'Hosur', state: 'Tamil Nadu' },
  { city: 'Kanchipuram', state: 'Tamil Nadu' },
  { city: 'Karur', state: 'Tamil Nadu' },
  { city: 'Kumbakonam', state: 'Tamil Nadu' },
  { city: 'Madurai', state: 'Tamil Nadu' },
  { city: 'Nagercoil', state: 'Tamil Nadu' },
  { city: 'Pollachi', state: 'Tamil Nadu' },
  { city: 'Pudukkottai', state: 'Tamil Nadu' },
  { city: 'Rajapalayam', state: 'Tamil Nadu' },
  { city: 'Salem', state: 'Tamil Nadu' },
  { city: 'Sivakasi', state: 'Tamil Nadu' },
  { city: 'Thanjavur', state: 'Tamil Nadu' },
  { city: 'Thoothukudi', state: 'Tamil Nadu' },
  { city: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { city: 'Tirunelveli', state: 'Tamil Nadu' },
  { city: 'Tiruppur', state: 'Tamil Nadu' },
  { city: 'Tiruvannamalai', state: 'Tamil Nadu' },
  { city: 'Vellore', state: 'Tamil Nadu' },

  // Telangana
  { city: 'Adilabad', state: 'Telangana' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Karimnagar', state: 'Telangana' },
  { city: 'Khammam', state: 'Telangana' },
  { city: 'Mahbubnagar', state: 'Telangana' },
  { city: 'Mancherial', state: 'Telangana' },
  { city: 'Miryalaguda', state: 'Telangana' },
  { city: 'Nalgonda', state: 'Telangana' },
  { city: 'Nizamabad', state: 'Telangana' },
  { city: 'Ramagundam', state: 'Telangana' },
  { city: 'Secunderabad', state: 'Telangana' },
  { city: 'Siddipet', state: 'Telangana' },
  { city: 'Suryapet', state: 'Telangana' },
  { city: 'Warangal', state: 'Telangana' },

  // Tripura
  { city: 'Agartala', state: 'Tripura' },

  // Uttar Pradesh
  { city: 'Agra', state: 'Uttar Pradesh' },
  { city: 'Aligarh', state: 'Uttar Pradesh' },
  { city: 'Amroha', state: 'Uttar Pradesh' },
  { city: 'Ayodhya', state: 'Uttar Pradesh' },
  { city: 'Azamgarh', state: 'Uttar Pradesh' },
  { city: 'Bahraich', state: 'Uttar Pradesh' },
  { city: 'Ballia', state: 'Uttar Pradesh' },
  { city: 'Banda', state: 'Uttar Pradesh' },
  { city: 'Bareilly', state: 'Uttar Pradesh' },
  { city: 'Basti', state: 'Uttar Pradesh' },
  { city: 'Bijnor', state: 'Uttar Pradesh' },
  { city: 'Budaun', state: 'Uttar Pradesh' },
  { city: 'Bulandshahr', state: 'Uttar Pradesh' },
  { city: 'Etawah', state: 'Uttar Pradesh' },
  { city: 'Farrukhabad', state: 'Uttar Pradesh' },
  { city: 'Fatehpur', state: 'Uttar Pradesh' },
  { city: 'Firozabad', state: 'Uttar Pradesh' },
  { city: 'Ghaziabad', state: 'Uttar Pradesh' },
  { city: 'Gonda', state: 'Uttar Pradesh' },
  { city: 'Gorakhpur', state: 'Uttar Pradesh' },
  { city: 'Greater Noida', state: 'Uttar Pradesh' },
  { city: 'Hapur', state: 'Uttar Pradesh' },
  { city: 'Hardoi', state: 'Uttar Pradesh' },
  { city: 'Jaunpur', state: 'Uttar Pradesh' },
  { city: 'Jhansi', state: 'Uttar Pradesh' },
  { city: 'Kanpur', state: 'Uttar Pradesh' },
  { city: 'Lakhimpur Kheri', state: 'Uttar Pradesh' },
  { city: 'Lalitpur', state: 'Uttar Pradesh' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Mathura', state: 'Uttar Pradesh' },
  { city: 'Mau', state: 'Uttar Pradesh' },
  { city: 'Meerut', state: 'Uttar Pradesh' },
  { city: 'Mirzapur', state: 'Uttar Pradesh' },
  { city: 'Moradabad', state: 'Uttar Pradesh' },
  { city: 'Muzaffarnagar', state: 'Uttar Pradesh' },
  { city: 'Noida', state: 'Uttar Pradesh' },
  { city: 'Orai', state: 'Uttar Pradesh' },
  { city: 'Pilibhit', state: 'Uttar Pradesh' },
  { city: 'Prayagraj', state: 'Uttar Pradesh' },
  { city: 'Raebareli', state: 'Uttar Pradesh' },
  { city: 'Rampur', state: 'Uttar Pradesh' },
  { city: 'Saharanpur', state: 'Uttar Pradesh' },
  { city: 'Shahjahanpur', state: 'Uttar Pradesh' },
  { city: 'Sitapur', state: 'Uttar Pradesh' },
  { city: 'Sultanpur', state: 'Uttar Pradesh' },
  { city: 'Unnao', state: 'Uttar Pradesh' },
  { city: 'Varanasi', state: 'Uttar Pradesh' },

  // Uttarakhand
  { city: 'Almora', state: 'Uttarakhand' },
  { city: 'Dehradun', state: 'Uttarakhand' },
  { city: 'Haldwani', state: 'Uttarakhand' },
  { city: 'Haridwar', state: 'Uttarakhand' },
  { city: 'Kashipur', state: 'Uttarakhand' },
  { city: 'Nainital', state: 'Uttarakhand' },
  { city: 'Rishikesh', state: 'Uttarakhand' },
  { city: 'Roorkee', state: 'Uttarakhand' },
  { city: 'Rudrapur', state: 'Uttarakhand' },

  // West Bengal
  { city: 'Asansol', state: 'West Bengal' },
  { city: 'Baharampur', state: 'West Bengal' },
  { city: 'Bally', state: 'West Bengal' },
  { city: 'Bankura', state: 'West Bengal' },
  { city: 'Barasat', state: 'West Bengal' },
  { city: 'Bardhaman', state: 'West Bengal' },
  { city: 'Barrackpore', state: 'West Bengal' },
  { city: 'Cooch Behar', state: 'West Bengal' },
  { city: 'Darjeeling', state: 'West Bengal' },
  { city: 'Durgapur', state: 'West Bengal' },
  { city: 'Haldia', state: 'West Bengal' },
  { city: 'Hooghly', state: 'West Bengal' },
  { city: 'Howrah', state: 'West Bengal' },
  { city: 'Jalpaiguri', state: 'West Bengal' },
  { city: 'Kharagpur', state: 'West Bengal' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Krishnanagar', state: 'West Bengal' },
  { city: 'Malda', state: 'West Bengal' },
  { city: 'Midnapore', state: 'West Bengal' },
  { city: 'Purulia', state: 'West Bengal' },
  { city: 'Raiganj', state: 'West Bengal' },
  { city: 'Serampore', state: 'West Bengal' },
  { city: 'Siliguri', state: 'West Bengal' },
].sort((a, b) => a.city.localeCompare(b.city));

/**
 * Specific 6-digit well-known overrides where the 3-digit prefix shares districts.
 */
const EXACT_PIN_MAP: Record<string, IndianCityEntry> = {
  '201301': { city: 'Noida', state: 'Uttar Pradesh' },
  '201306': { city: 'Greater Noida', state: 'Uttar Pradesh' },
  '201310': { city: 'Greater Noida', state: 'Uttar Pradesh' },
  '396191': { city: 'Vapi', state: 'Gujarat' },
  '396195': { city: 'Vapi', state: 'Gujarat' },
  '396210': { city: 'Daman', state: 'Dadra & Nagar Haveli and Daman & Diu' },
  '396230': { city: 'Silvassa', state: 'Dadra & Nagar Haveli and Daman & Diu' },
  '400703': { city: 'Navi Mumbai', state: 'Maharashtra' },
  '400705': { city: 'Navi Mumbai', state: 'Maharashtra' },
  '400706': { city: 'Navi Mumbai', state: 'Maharashtra' },
  '410206': { city: 'Panvel', state: 'Maharashtra' },
  '410210': { city: 'Navi Mumbai', state: 'Maharashtra' },
  '411018': { city: 'Pimpri-Chinchwad', state: 'Maharashtra' },
  '411019': { city: 'Pimpri-Chinchwad', state: 'Maharashtra' },
  '411044': { city: 'Pimpri-Chinchwad', state: 'Maharashtra' },
  '500003': { city: 'Secunderabad', state: 'Telangana' },
  '160055': { city: 'Mohali', state: 'Punjab' },
  '160062': { city: 'Mohali', state: 'Punjab' },
  '134109': { city: 'Panchkula', state: 'Haryana' },
  '134112': { city: 'Panchkula', state: 'Haryana' },
  '744101': { city: 'Port Blair', state: 'Andaman & Nicobar Islands' },
  '682555': { city: 'Kavaratti', state: 'Lakshadweep' },
  '194101': { city: 'Leh', state: 'Ladakh' },
  '194103': { city: 'Kargil', state: 'Ladakh' },
};

/**
 * All-India 3-digit PIN sorting district prefix table (covers India Post zones 1-8).
 */
const PIN_PREFIX_3_MAP: Record<string, IndianCityEntry> = {
  // Zone 1: Delhi, Haryana, Punjab, HP, J&K, Ladakh, Chandigarh
  '110': { city: 'New Delhi', state: 'Delhi' },
  '121': { city: 'Faridabad', state: 'Haryana' },
  '122': { city: 'Gurugram', state: 'Haryana' },
  '123': { city: 'Rewari', state: 'Haryana' },
  '124': { city: 'Rohtak', state: 'Haryana' },
  '125': { city: 'Hisar', state: 'Haryana' },
  '126': { city: 'Jind', state: 'Haryana' },
  '127': { city: 'Bhiwani', state: 'Haryana' },
  '131': { city: 'Sonipat', state: 'Haryana' },
  '132': { city: 'Panipat', state: 'Haryana' },
  '133': { city: 'Ambala', state: 'Haryana' },
  '134': { city: 'Panchkula', state: 'Haryana' },
  '135': { city: 'Yamunanagar', state: 'Haryana' },
  '136': { city: 'Kurukshetra', state: 'Haryana' },
  '140': { city: 'Mohali', state: 'Punjab' },
  '141': { city: 'Ludhiana', state: 'Punjab' },
  '142': { city: 'Moga', state: 'Punjab' },
  '143': { city: 'Amritsar', state: 'Punjab' },
  '144': { city: 'Jalandhar', state: 'Punjab' },
  '145': { city: 'Pathankot', state: 'Punjab' },
  '146': { city: 'Hoshiarpur', state: 'Punjab' },
  '147': { city: 'Patiala', state: 'Punjab' },
  '148': { city: 'Sangrur', state: 'Punjab' },
  '151': { city: 'Bathinda', state: 'Punjab' },
  '152': { city: 'Firozpur', state: 'Punjab' },
  '160': { city: 'Chandigarh', state: 'Chandigarh' },
  '171': { city: 'Shimla', state: 'Himachal Pradesh' },
  '172': { city: 'Shimla', state: 'Himachal Pradesh' },
  '173': { city: 'Solan', state: 'Himachal Pradesh' },
  '174': { city: 'Una', state: 'Himachal Pradesh' },
  '175': { city: 'Mandi', state: 'Himachal Pradesh' },
  '176': { city: 'Dharamshala', state: 'Himachal Pradesh' },
  '177': { city: 'Hamirpur', state: 'Himachal Pradesh' },
  '180': { city: 'Jammu', state: 'Jammu & Kashmir' },
  '181': { city: 'Jammu', state: 'Jammu & Kashmir' },
  '182': { city: 'Udhampur', state: 'Jammu & Kashmir' },
  '184': { city: 'Kathua', state: 'Jammu & Kashmir' },
  '190': { city: 'Srinagar', state: 'Jammu & Kashmir' },
  '192': { city: 'Anantnag', state: 'Jammu & Kashmir' },
  '193': { city: 'Baramulla', state: 'Jammu & Kashmir' },
  '194': { city: 'Leh', state: 'Ladakh' },

  // Zone 2: Uttar Pradesh, Uttarakhand
  '201': { city: 'Ghaziabad', state: 'Uttar Pradesh' },
  '202': { city: 'Aligarh', state: 'Uttar Pradesh' },
  '203': { city: 'Bulandshahr', state: 'Uttar Pradesh' },
  '204': { city: 'Aligarh', state: 'Uttar Pradesh' },
  '205': { city: 'Etawah', state: 'Uttar Pradesh' },
  '206': { city: 'Etawah', state: 'Uttar Pradesh' },
  '207': { city: 'Aligarh', state: 'Uttar Pradesh' },
  '208': { city: 'Kanpur', state: 'Uttar Pradesh' },
  '209': { city: 'Unnao', state: 'Uttar Pradesh' },
  '210': { city: 'Banda', state: 'Uttar Pradesh' },
  '211': { city: 'Prayagraj', state: 'Uttar Pradesh' },
  '212': { city: 'Fatehpur', state: 'Uttar Pradesh' },
  '221': { city: 'Varanasi', state: 'Uttar Pradesh' },
  '222': { city: 'Jaunpur', state: 'Uttar Pradesh' },
  '224': { city: 'Ayodhya', state: 'Uttar Pradesh' },
  '225': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '226': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '227': { city: 'Raebareli', state: 'Uttar Pradesh' },
  '228': { city: 'Sultanpur', state: 'Uttar Pradesh' },
  '229': { city: 'Raebareli', state: 'Uttar Pradesh' },
  '231': { city: 'Mirzapur', state: 'Uttar Pradesh' },
  '241': { city: 'Hardoi', state: 'Uttar Pradesh' },
  '242': { city: 'Shahjahanpur', state: 'Uttar Pradesh' },
  '243': { city: 'Bareilly', state: 'Uttar Pradesh' },
  '244': { city: 'Moradabad', state: 'Uttar Pradesh' },
  '245': { city: 'Hapur', state: 'Uttar Pradesh' },
  '246': { city: 'Bijnor', state: 'Uttar Pradesh' },
  '247': { city: 'Saharanpur', state: 'Uttar Pradesh' },
  '248': { city: 'Dehradun', state: 'Uttarakhand' },
  '249': { city: 'Haridwar', state: 'Uttarakhand' },
  '250': { city: 'Meerut', state: 'Uttar Pradesh' },
  '251': { city: 'Muzaffarnagar', state: 'Uttar Pradesh' },
  '261': { city: 'Sitapur', state: 'Uttar Pradesh' },
  '262': { city: 'Lakhimpur Kheri', state: 'Uttar Pradesh' },
  '263': { city: 'Nainital', state: 'Uttarakhand' },
  '271': { city: 'Gonda', state: 'Uttar Pradesh' },
  '272': { city: 'Basti', state: 'Uttar Pradesh' },
  '273': { city: 'Gorakhpur', state: 'Uttar Pradesh' },
  '275': { city: 'Mau', state: 'Uttar Pradesh' },
  '276': { city: 'Azamgarh', state: 'Uttar Pradesh' },
  '277': { city: 'Ballia', state: 'Uttar Pradesh' },
  '281': { city: 'Mathura', state: 'Uttar Pradesh' },
  '282': { city: 'Agra', state: 'Uttar Pradesh' },
  '283': { city: 'Firozabad', state: 'Uttar Pradesh' },
  '284': { city: 'Jhansi', state: 'Uttar Pradesh' },
  '285': { city: 'Orai', state: 'Uttar Pradesh' },

  // Zone 3: Rajasthan, Gujarat, Daman & Diu, Dadra & Nagar Haveli
  '301': { city: 'Alwar', state: 'Rajasthan' },
  '302': { city: 'Jaipur', state: 'Rajasthan' },
  '303': { city: 'Jaipur', state: 'Rajasthan' },
  '304': { city: 'Tonk', state: 'Rajasthan' },
  '305': { city: 'Ajmer', state: 'Rajasthan' },
  '306': { city: 'Pali', state: 'Rajasthan' },
  '307': { city: 'Pali', state: 'Rajasthan' },
  '311': { city: 'Bhilwara', state: 'Rajasthan' },
  '312': { city: 'Chittorgarh', state: 'Rajasthan' },
  '313': { city: 'Udaipur', state: 'Rajasthan' },
  '321': { city: 'Bharatpur', state: 'Rajasthan' },
  '324': { city: 'Kota', state: 'Rajasthan' },
  '326': { city: 'Jhalawar', state: 'Rajasthan' },
  '327': { city: 'Banswara', state: 'Rajasthan' },
  '331': { city: 'Churu', state: 'Rajasthan' },
  '332': { city: 'Sikar', state: 'Rajasthan' },
  '333': { city: 'Jhunjhunu', state: 'Rajasthan' },
  '334': { city: 'Bikaner', state: 'Rajasthan' },
  '335': { city: 'Sri Ganganagar', state: 'Rajasthan' },
  '341': { city: 'Nagaur', state: 'Rajasthan' },
  '342': { city: 'Jodhpur', state: 'Rajasthan' },
  '344': { city: 'Barmer', state: 'Rajasthan' },
  '345': { city: 'Jaisalmer', state: 'Rajasthan' },
  '360': { city: 'Rajkot', state: 'Gujarat' },
  '361': { city: 'Jamnagar', state: 'Gujarat' },
  '362': { city: 'Junagadh', state: 'Gujarat' },
  '363': { city: 'Surendranagar', state: 'Gujarat' },
  '364': { city: 'Bhavnagar', state: 'Gujarat' },
  '365': { city: 'Amreli', state: 'Gujarat' },
  '370': { city: 'Bhuj', state: 'Gujarat' },
  '380': { city: 'Ahmedabad', state: 'Gujarat' },
  '382': { city: 'Gandhinagar', state: 'Gujarat' },
  '383': { city: 'Himmatnagar', state: 'Gujarat' },
  '384': { city: 'Mahesana', state: 'Gujarat' },
  '385': { city: 'Palanpur', state: 'Gujarat' },
  '387': { city: 'Nadiad', state: 'Gujarat' },
  '388': { city: 'Anand', state: 'Gujarat' },
  '389': { city: 'Godhra', state: 'Gujarat' },
  '390': { city: 'Vadodara', state: 'Gujarat' },
  '391': { city: 'Vadodara', state: 'Gujarat' },
  '392': { city: 'Bharuch', state: 'Gujarat' },
  '393': { city: 'Ankleshwar', state: 'Gujarat' },
  '394': { city: 'Surat', state: 'Gujarat' },
  '395': { city: 'Surat', state: 'Gujarat' },
  '396': { city: 'Valsad', state: 'Gujarat' },

  // Zone 4: Maharashtra, Goa, Madhya Pradesh, Chhattisgarh
  '400': { city: 'Mumbai', state: 'Maharashtra' },
  '401': { city: 'Vasai-Virar', state: 'Maharashtra' },
  '402': { city: 'Panvel', state: 'Maharashtra' },
  '403': { city: 'Panaji', state: 'Goa' },
  '410': { city: 'Navi Mumbai', state: 'Maharashtra' },
  '411': { city: 'Pune', state: 'Maharashtra' },
  '412': { city: 'Pune', state: 'Maharashtra' },
  '413': { city: 'Solapur', state: 'Maharashtra' },
  '414': { city: 'Ahmednagar', state: 'Maharashtra' },
  '415': { city: 'Satara', state: 'Maharashtra' },
  '416': { city: 'Kolhapur', state: 'Maharashtra' },
  '421': { city: 'Kalyan-Dombivli', state: 'Maharashtra' },
  '422': { city: 'Nashik', state: 'Maharashtra' },
  '423': { city: 'Malegaon', state: 'Maharashtra' },
  '424': { city: 'Dhule', state: 'Maharashtra' },
  '425': { city: 'Jalgaon', state: 'Maharashtra' },
  '431': { city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  '440': { city: 'Nagpur', state: 'Maharashtra' },
  '441': { city: 'Nagpur', state: 'Maharashtra' },
  '442': { city: 'Chandrapur', state: 'Maharashtra' },
  '444': { city: 'Amravati', state: 'Maharashtra' },
  '445': { city: 'Yavatmal', state: 'Maharashtra' },
  '450': { city: 'Khandwa', state: 'Madhya Pradesh' },
  '451': { city: 'Khargone', state: 'Madhya Pradesh' },
  '452': { city: 'Indore', state: 'Madhya Pradesh' },
  '453': { city: 'Indore', state: 'Madhya Pradesh' },
  '455': { city: 'Dewas', state: 'Madhya Pradesh' },
  '456': { city: 'Ujjain', state: 'Madhya Pradesh' },
  '457': { city: 'Ratlam', state: 'Madhya Pradesh' },
  '458': { city: 'Mandsaur', state: 'Madhya Pradesh' },
  '460': { city: 'Betul', state: 'Madhya Pradesh' },
  '461': { city: 'Hoshangabad', state: 'Madhya Pradesh' },
  '462': { city: 'Bhopal', state: 'Madhya Pradesh' },
  '464': { city: 'Vidisha', state: 'Madhya Pradesh' },
  '466': { city: 'Sehore', state: 'Madhya Pradesh' },
  '470': { city: 'Sagar', state: 'Madhya Pradesh' },
  '471': { city: 'Chhatarpur', state: 'Madhya Pradesh' },
  '473': { city: 'Guna', state: 'Madhya Pradesh' },
  '474': { city: 'Gwalior', state: 'Madhya Pradesh' },
  '476': { city: 'Morena', state: 'Madhya Pradesh' },
  '480': { city: 'Chhindwara', state: 'Madhya Pradesh' },
  '482': { city: 'Jabalpur', state: 'Madhya Pradesh' },
  '483': { city: 'Katni', state: 'Madhya Pradesh' },
  '485': { city: 'Satna', state: 'Madhya Pradesh' },
  '486': { city: 'Rewa', state: 'Madhya Pradesh' },
  '490': { city: 'Bhilai', state: 'Chhattisgarh' },
  '491': { city: 'Durg', state: 'Chhattisgarh' },
  '492': { city: 'Raipur', state: 'Chhattisgarh' },
  '494': { city: 'Jagdalpur', state: 'Chhattisgarh' },
  '495': { city: 'Bilaspur', state: 'Chhattisgarh' },
  '496': { city: 'Raigarh', state: 'Chhattisgarh' },
  '497': { city: 'Ambikapur', state: 'Chhattisgarh' },

  // Zone 5: Telangana, Andhra Pradesh, Karnataka
  '500': { city: 'Hyderabad', state: 'Telangana' },
  '502': { city: 'Siddipet', state: 'Telangana' },
  '503': { city: 'Nizamabad', state: 'Telangana' },
  '504': { city: 'Adilabad', state: 'Telangana' },
  '505': { city: 'Karimnagar', state: 'Telangana' },
  '506': { city: 'Warangal', state: 'Telangana' },
  '507': { city: 'Khammam', state: 'Telangana' },
  '508': { city: 'Nalgonda', state: 'Telangana' },
  '509': { city: 'Mahbubnagar', state: 'Telangana' },
  '515': { city: 'Anantapur', state: 'Andhra Pradesh' },
  '516': { city: 'Kadapa', state: 'Andhra Pradesh' },
  '517': { city: 'Tirupati', state: 'Andhra Pradesh' },
  '518': { city: 'Kurnool', state: 'Andhra Pradesh' },
  '520': { city: 'Vijayawada', state: 'Andhra Pradesh' },
  '521': { city: 'Machilipatnam', state: 'Andhra Pradesh' },
  '522': { city: 'Guntur', state: 'Andhra Pradesh' },
  '523': { city: 'Ongole', state: 'Andhra Pradesh' },
  '524': { city: 'Nellore', state: 'Andhra Pradesh' },
  '530': { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  '532': { city: 'Srikakulam', state: 'Andhra Pradesh' },
  '533': { city: 'Rajahmundry', state: 'Andhra Pradesh' },
  '534': { city: 'Eluru', state: 'Andhra Pradesh' },
  '535': { city: 'Vizianagaram', state: 'Andhra Pradesh' },
  '560': { city: 'Bengaluru', state: 'Karnataka' },
  '562': { city: 'Bengaluru', state: 'Karnataka' },
  '563': { city: 'Kolar', state: 'Karnataka' },
  '570': { city: 'Mysuru', state: 'Karnataka' },
  '571': { city: 'Mandya', state: 'Karnataka' },
  '572': { city: 'Tumakuru', state: 'Karnataka' },
  '573': { city: 'Hassan', state: 'Karnataka' },
  '574': { city: 'Mangaluru', state: 'Karnataka' },
  '575': { city: 'Mangaluru', state: 'Karnataka' },
  '576': { city: 'Udupi', state: 'Karnataka' },
  '577': { city: 'Shivamogga', state: 'Karnataka' },
  '580': { city: 'Hubballi-Dharwad', state: 'Karnataka' },
  '581': { city: 'Hubballi-Dharwad', state: 'Karnataka' },
  '582': { city: 'Gadag', state: 'Karnataka' },
  '583': { city: 'Ballari', state: 'Karnataka' },
  '584': { city: 'Raichur', state: 'Karnataka' },
  '585': { city: 'Kalaburagi', state: 'Karnataka' },
  '586': { city: 'Vijayapura', state: 'Karnataka' },
  '587': { city: 'Bagalkot', state: 'Karnataka' },
  '590': { city: 'Belagavi', state: 'Karnataka' },
  '591': { city: 'Belagavi', state: 'Karnataka' },

  // Zone 6: Tamil Nadu, Kerala, Puducherry, Lakshadweep
  '600': { city: 'Chennai', state: 'Tamil Nadu' },
  '601': { city: 'Chennai', state: 'Tamil Nadu' },
  '602': { city: 'Avadi', state: 'Tamil Nadu' },
  '603': { city: 'Kanchipuram', state: 'Tamil Nadu' },
  '604': { city: 'Tiruvannamalai', state: 'Tamil Nadu' },
  '605': { city: 'Puducherry', state: 'Puducherry' },
  '606': { city: 'Tiruvannamalai', state: 'Tamil Nadu' },
  '607': { city: 'Cuddalore', state: 'Tamil Nadu' },
  '609': { city: 'Karaikal', state: 'Puducherry' },
  '612': { city: 'Kumbakonam', state: 'Tamil Nadu' },
  '613': { city: 'Thanjavur', state: 'Tamil Nadu' },
  '620': { city: 'Tiruchirappalli', state: 'Tamil Nadu' },
  '622': { city: 'Pudukkottai', state: 'Tamil Nadu' },
  '624': { city: 'Dindigul', state: 'Tamil Nadu' },
  '625': { city: 'Madurai', state: 'Tamil Nadu' },
  '626': { city: 'Sivakasi', state: 'Tamil Nadu' },
  '627': { city: 'Tirunelveli', state: 'Tamil Nadu' },
  '628': { city: 'Thoothukudi', state: 'Tamil Nadu' },
  '629': { city: 'Nagercoil', state: 'Tamil Nadu' },
  '631': { city: 'Kanchipuram', state: 'Tamil Nadu' },
  '632': { city: 'Vellore', state: 'Tamil Nadu' },
  '635': { city: 'Hosur', state: 'Tamil Nadu' },
  '636': { city: 'Salem', state: 'Tamil Nadu' },
  '638': { city: 'Erode', state: 'Tamil Nadu' },
  '639': { city: 'Karur', state: 'Tamil Nadu' },
  '641': { city: 'Coimbatore', state: 'Tamil Nadu' },
  '642': { city: 'Pollachi', state: 'Tamil Nadu' },
  '670': { city: 'Kannur', state: 'Kerala' },
  '671': { city: 'Kasaragod', state: 'Kerala' },
  '673': { city: 'Kozhikode', state: 'Kerala' },
  '676': { city: 'Malappuram', state: 'Kerala' },
  '678': { city: 'Palakkad', state: 'Kerala' },
  '680': { city: 'Thrissur', state: 'Kerala' },
  '682': { city: 'Kochi', state: 'Kerala' },
  '683': { city: 'Kochi', state: 'Kerala' },
  '686': { city: 'Kottayam', state: 'Kerala' },
  '688': { city: 'Alappuzha', state: 'Kerala' },
  '689': { city: 'Pathanamthitta', state: 'Kerala' },
  '691': { city: 'Kollam', state: 'Kerala' },
  '695': { city: 'Thiruvananthapuram', state: 'Kerala' },

  // Zone 7: West Bengal, Odisha, Assam, Northeast, Andaman & Nicobar
  '700': { city: 'Kolkata', state: 'West Bengal' },
  '711': { city: 'Howrah', state: 'West Bengal' },
  '712': { city: 'Hooghly', state: 'West Bengal' },
  '713': { city: 'Durgapur', state: 'West Bengal' },
  '721': { city: 'Kharagpur', state: 'West Bengal' },
  '722': { city: 'Bankura', state: 'West Bengal' },
  '723': { city: 'Purulia', state: 'West Bengal' },
  '732': { city: 'Malda', state: 'West Bengal' },
  '733': { city: 'Raiganj', state: 'West Bengal' },
  '734': { city: 'Siliguri', state: 'West Bengal' },
  '735': { city: 'Jalpaiguri', state: 'West Bengal' },
  '736': { city: 'Cooch Behar', state: 'West Bengal' },
  '737': { city: 'Gangtok', state: 'Sikkim' },
  '741': { city: 'Krishnanagar', state: 'West Bengal' },
  '742': { city: 'Baharampur', state: 'West Bengal' },
  '743': { city: 'Barasat', state: 'West Bengal' },
  '744': { city: 'Port Blair', state: 'Andaman & Nicobar Islands' },
  '751': { city: 'Bhubaneswar', state: 'Odisha' },
  '752': { city: 'Puri', state: 'Odisha' },
  '753': { city: 'Cuttack', state: 'Odisha' },
  '756': { city: 'Balasore', state: 'Odisha' },
  '757': { city: 'Baripada', state: 'Odisha' },
  '760': { city: 'Berhampur', state: 'Odisha' },
  '768': { city: 'Sambalpur', state: 'Odisha' },
  '769': { city: 'Rourkela', state: 'Odisha' },
  '781': { city: 'Guwahati', state: 'Assam' },
  '782': { city: 'Nagaon', state: 'Assam' },
  '783': { city: 'Bongaigaon', state: 'Assam' },
  '784': { city: 'Tezpur', state: 'Assam' },
  '785': { city: 'Jorhat', state: 'Assam' },
  '786': { city: 'Dibrugarh', state: 'Assam' },
  '788': { city: 'Silchar', state: 'Assam' },
  '790': { city: 'Tawang', state: 'Arunachal Pradesh' },
  '791': { city: 'Itanagar', state: 'Arunachal Pradesh' },
  '793': { city: 'Shillong', state: 'Meghalaya' },
  '794': { city: 'Tura', state: 'Meghalaya' },
  '795': { city: 'Imphal', state: 'Manipur' },
  '796': { city: 'Aizawl', state: 'Mizoram' },
  '797': { city: 'Dimapur', state: 'Nagaland' },
  '799': { city: 'Agartala', state: 'Tripura' },

  // Zone 8: Bihar, Jharkhand
  '800': { city: 'Patna', state: 'Bihar' },
  '801': { city: 'Patna', state: 'Bihar' },
  '802': { city: 'Arrah', state: 'Bihar' },
  '803': { city: 'Bihar Sharif', state: 'Bihar' },
  '811': { city: 'Munger', state: 'Bihar' },
  '812': { city: 'Bhagalpur', state: 'Bihar' },
  '814': { city: 'Dumka', state: 'Jharkhand' },
  '815': { city: 'Giridih', state: 'Jharkhand' },
  '821': { city: 'Sasaram', state: 'Bihar' },
  '823': { city: 'Gaya', state: 'Bihar' },
  '825': { city: 'Hazaribagh', state: 'Jharkhand' },
  '826': { city: 'Dhanbad', state: 'Jharkhand' },
  '827': { city: 'Bokaro', state: 'Jharkhand' },
  '828': { city: 'Dhanbad', state: 'Jharkhand' },
  '829': { city: 'Ramgarh', state: 'Jharkhand' },
  '831': { city: 'Jamshedpur', state: 'Jharkhand' },
  '834': { city: 'Ranchi', state: 'Jharkhand' },
  '841': { city: 'Chapra', state: 'Bihar' },
  '842': { city: 'Muzaffarpur', state: 'Bihar' },
  '844': { city: 'Hajipur', state: 'Bihar' },
  '845': { city: 'Motihari', state: 'Bihar' },
  '846': { city: 'Darbhanga', state: 'Bihar' },
  '848': { city: 'Samastipur', state: 'Bihar' },
  '851': { city: 'Begusarai', state: 'Bihar' },
  '852': { city: 'Saharsa', state: 'Bihar' },
  '854': { city: 'Purnia', state: 'Bihar' },
  '855': { city: 'Katihar', state: 'Bihar' },
};

const STATE_BY_FIRST_TWO: Array<{ min: number; max: number; fallback: IndianCityEntry }> = [
  { min: 11, max: 11, fallback: { city: 'New Delhi', state: 'Delhi' } },
  { min: 12, max: 13, fallback: { city: 'Gurugram', state: 'Haryana' } },
  { min: 14, max: 15, fallback: { city: 'Ludhiana', state: 'Punjab' } },
  { min: 16, max: 16, fallback: { city: 'Chandigarh', state: 'Chandigarh' } },
  { min: 17, max: 17, fallback: { city: 'Shimla', state: 'Himachal Pradesh' } },
  { min: 18, max: 19, fallback: { city: 'Jammu', state: 'Jammu & Kashmir' } },
  { min: 20, max: 23, fallback: { city: 'Lucknow', state: 'Uttar Pradesh' } },
  { min: 24, max: 24, fallback: { city: 'Dehradun', state: 'Uttarakhand' } },
  { min: 25, max: 28, fallback: { city: 'Agra', state: 'Uttar Pradesh' } },
  { min: 30, max: 34, fallback: { city: 'Jaipur', state: 'Rajasthan' } },
  { min: 36, max: 39, fallback: { city: 'Ahmedabad', state: 'Gujarat' } },
  { min: 40, max: 44, fallback: { city: 'Mumbai', state: 'Maharashtra' } },
  { min: 45, max: 48, fallback: { city: 'Indore', state: 'Madhya Pradesh' } },
  { min: 49, max: 49, fallback: { city: 'Raipur', state: 'Chhattisgarh' } },
  { min: 50, max: 50, fallback: { city: 'Hyderabad', state: 'Telangana' } },
  { min: 51, max: 53, fallback: { city: 'Vijayawada', state: 'Andhra Pradesh' } },
  { min: 56, max: 59, fallback: { city: 'Bengaluru', state: 'Karnataka' } },
  { min: 60, max: 64, fallback: { city: 'Chennai', state: 'Tamil Nadu' } },
  { min: 67, max: 69, fallback: { city: 'Kochi', state: 'Kerala' } },
  { min: 70, max: 74, fallback: { city: 'Kolkata', state: 'West Bengal' } },
  { min: 75, max: 77, fallback: { city: 'Bhubaneswar', state: 'Odisha' } },
  { min: 78, max: 78, fallback: { city: 'Guwahati', state: 'Assam' } },
  { min: 79, max: 79, fallback: { city: 'Shillong', state: 'Meghalaya' } },
  { min: 80, max: 81, fallback: { city: 'Patna', state: 'Bihar' } },
  { min: 82, max: 83, fallback: { city: 'Ranchi', state: 'Jharkhand' } },
  { min: 84, max: 85, fallback: { city: 'Muzaffarpur', state: 'Bihar' } },
];

export function isValidIndianPincode(pin: string): boolean {
  return /^[1-9]\d{5}$/.test(pin.trim());
}

/**
 * Synchronous instant lookup for any valid 6-digit Indian PIN code.
 * Checks exact 6-digit overrides, then 3-digit postal sorting district, then 2-digit state circle.
 */
export function lookupIndianPincode(rawPin: string): PincodeLookupResult | null {
  const pin = rawPin.replace(/\D/g, '').slice(0, 6);
  if (!isValidIndianPincode(pin)) {
    return null;
  }

  const exact = EXACT_PIN_MAP[pin];
  if (exact) {
    return { ...exact, source: 'exact' };
  }

  const prefix3 = pin.slice(0, 3);
  const by3 = PIN_PREFIX_3_MAP[prefix3];
  if (by3) {
    return { ...by3, source: 'prefix' };
  }

  const prefix2 = Number.parseInt(pin.slice(0, 2), 10);
  const by2 = STATE_BY_FIRST_TWO.find((r) => prefix2 >= r.min && prefix2 <= r.max);
  if (by2) {
    return { ...by2.fallback, source: 'prefix' };
  }

  return null;
}

/**
 * Optional live refinement using India Post public API (non-blocking; safely returns null on network error or timeout).
 */
export async function fetchIndianPincodeRemote(
  rawPin: string,
  signal?: AbortSignal,
): Promise<PincodeLookupResult | null> {
  const pin = rawPin.replace(/\D/g, '').slice(0, 6);
  if (!isValidIndianPincode(pin)) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const onExternalAbort = () => controller.abort();
    signal?.addEventListener('abort', onExternalAbort);

    const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    signal?.removeEventListener('abort', onExternalAbort);

    if (!response.ok) return null;
    const payload = (await response.json()) as Array<{
      Status?: string;
      PostOffice?: Array<{ District?: string; State?: string; Block?: string }>;
    }>;

    const first = payload?.[0];
    const po = first?.PostOffice?.[0];
    if (first?.Status === 'Success' && po?.District && po?.State) {
      return {
        city: po.District.trim(),
        state: po.State.trim(),
        source: 'api',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function filterIndianCities(query: string, limit = 60): IndianCityEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return INDIAN_CITIES.slice(0, limit);
  }
  const startsWith: IndianCityEntry[] = [];
  const contains: IndianCityEntry[] = [];
  for (const entry of INDIAN_CITIES) {
    const cityLower = entry.city.toLowerCase();
    const stateLower = entry.state.toLowerCase();
    if (cityLower.startsWith(q)) {
      startsWith.push(entry);
    } else if (cityLower.includes(q) || stateLower.includes(q)) {
      contains.push(entry);
    }
  }
  return [...startsWith, ...contains].slice(0, limit);
}
