import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  makeGetRequestWithToken,
  makePostRequest,
  makePostRequestWithToken,
} from './apiService';

const BASE_URL = 'https://admin.homesto.in/Api';
// const BASE_URL = 'https://hotel.easytipsntricks.com/Api';

const API = {
  async setLoginData(phone) {
    try {
      const data = await makePostRequest(BASE_URL + '/login', {
        phone_no: phone,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getOtpData(otp, phone) {
    try {
      const data = await makePostRequest(BASE_URL + '/verify_otp', {
        phone_no: phone,
        otp: otp,
      });

      if (data.success) {
        return data;
      } else {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getLoginViaEmail(username, password) {
    try {
      const data = await makePostRequest(
        BASE_URL + '/vendor_login_via_username_password',
        {
          username: username,
          password: password,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setRegistrationData(name, email, phone, password, username) {
    try {
      const data = await makePostRequest(BASE_URL + '/new_vendor_registration', {
        name: name,
        email: email,
        phone: phone,
        password: password,
        username: username,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setNewUserRegistration(name, username, emailId, phoneNo, password) {
    try {
      const data = await makePostRequest(BASE_URL + '/new_user_registration', {
        name: name,
        username: username,
        email: emailId,
        phone: phoneNo,
        password: password,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setForgotPassword(emailId) {
    try {
      const data = await makePostRequest(BASE_URL + '/forgot_password', {
        email_id: emailId,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getMenuList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/get_menu_list');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getAllAnemeties() {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/get_all_amenities',
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getCountries() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/country');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getStateByCountryId(id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/state_by_country',
        {
          country_id: id,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getLocationList(keyword) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/get_city_state_country_by_keyword',
        {
          keyword: keyword,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCityByCountryStateId(countryId, stateId) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/city_by_state_country',
        {
          country_id: countryId,
          state_id: stateId,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getFilterData(category, location) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/filter', {
        category,
        location,
      });

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setAddHotel(
    hotelName,
    addr,
    country,
    state,
    city,
    gMapLink,
    bookingAmt,
    bookingAmtHrs,
    desc,
    placesNearBy,
    noOfGuest,
    noOfBathroom,
    noOfBeds,
    noOfBedRoom,
    rulesRegulation,
    cancelPolicy,
    custNo,
    emailId,
    catId,
    anemities,
    multipleImages,
  ) {
    let access_token = await AsyncStorage.getItem('accessToken');
    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', access_token);
      myHeaders.append('Content-Type', 'multipart/form-data');

      function getFormData(object) {
        const data = new FormData();
        Object.keys(object).forEach(key => data.append(key, object[key]));
        return data;
      }

      const formdata = getFormData({
        hotelname: hotelName,
        address: addr,
        country: country,
        state: state,
        city: city,
        g_map_link: gMapLink,
        booking_amt: bookingAmt,
        booking_amt_hr: bookingAmtHrs,
        discription: desc,
        places_near_by: placesNearBy,
        no_of_guest: noOfGuest,
        no_of_bedroom: noOfBedRoom,
        no_of_bathroom: noOfBathroom,
        no_of_bed: noOfBeds,
        rules_and_regulation: rulesRegulation,
        cancellation_policy: cancelPolicy,
        cust_no: custNo,
        phone_no: custNo,
        email: emailId,
        category_name: catId,
        hot: '0',
        popular: '0',
        amenities: anemities,
      });

      multipleImages.forEach((item, i) => {
        formdata.append('prd_image1[]', {
          uri: item.path,
          type: 'image/jpeg',
          name: `MultipleImage_${Date.now()}_${i}.jpg`,
        });
      });
      anemities.forEach((item, i) => {
        formdata.append('amenities[]', item);
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(BASE_URL + '/hotel_listing', requestOptions);

      const data = await response.json();

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getVlogs() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/vlog');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getCategories() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/category');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getSubCategories(id) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/sub_category', {
        category_id: id,
      });

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getHotelListByCatId(id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/hotel_detail_by_category',
        {
          category_id: id,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getHotelDetailById(id) {
    console.log(id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/hotel_detail_by_id',
        {
          hotel_id: id,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setHotelBooking(
    checkInDate,
    checkOutDate,
    adult,
    children,
    id,
    offerId,
    booking_type,
    hrs,
    paymentId,
  ) {
    // console.log(booking_type, hrs);
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/booking', {
        check_in: checkInDate,
        check_out: checkOutDate,
        no_of_adults: adult,
        no_of_childs: children,
        hotel_id: id,
        offer_id: offerId,
        booking_type,
        hrs,
        payment_id: paymentId,
      });

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getHotelList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/hotel_list');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getOffersList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/offer');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getBannerImages() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/banner');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getAdsList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/ads_line');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getAdvertisementImages() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/ads');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setChangePassword(oldPassword, newPassword, confirmNewPassword) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/change_password',
        {
          old_password: oldPassword,
          new_password: newPassword,
          c_password: confirmNewPassword,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getUserProfile() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/view_vendor_profile');

      if (data && data.success === 'true') {
        return data;
      } else {
        console.log('Token Expire or profile fetch failed');
        return { success: 'false', msg: 'Token expired or invalid' };
      }
    } catch (error) {
      console.log('getUserProfile error:', error);
      return { success: 'false', msg: 'Network error' };
    }
  },

  async setUserProfile(name, emailId, username, password) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/update_vendor_profile',
        {
          name: name,
          email: emailId,
          username: username,
          password: password,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getAllBookings() {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/get_all_order_by_custumer_id',
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getBookingDetailById(id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/order_detail_by_id',
        {
          order_id: id,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setCancelBooking(id, reason) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/cancel_order', {
        order_id: id,
        reason: reason,
      });

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
  async getOrdersByVendorId(vendorId) {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/get_all_order_by_vendor_id?vendor_id=' + vendorId,
      );

      return data;
    } catch (error) {
      return error.response;
    }
  },

  async setChangePassword(password) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/update_vendor_profile_password',
        {
          password: password,
        },
      );

      return data;
    } catch (error) {
      return error.response;
    }
  },
};

export default API;
