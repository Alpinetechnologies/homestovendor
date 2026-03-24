import {COLORS} from '../constants/colors';
import RazorpayCheckout from 'react-native-razorpay';
import {IMAGES} from '../constants/images';
import {Image} from 'react-native';

const PAYMENT = {
  async RazorpayPayment(profile, amount) {
    console.log(profile, amount);
    try {
      var options = {
        description: 'Payment',
        image: Image.resolveAssetSource(IMAGES.LOGO).uri,
        currency: 'INR',
        key: 'rzp_live_TGnnd4aNSwKhSD',

        amount: parseFloat(amount) * 100,
        name: 'Hotelio',
        notify: {
          sms: true,
        },
        prefill: {
          email: profile.email,
          contact: '+91' + profile.mobileNo,
          name: profile.name,
        },
        theme: {color: COLORS.PRIMARY},
      };
      const data = await RazorpayCheckout.open(options);

      if (data) {
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return error.response;
    }
  },
};

export {PAYMENT};
