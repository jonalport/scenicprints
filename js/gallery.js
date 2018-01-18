var prints = {
  'bondi-beach': [
    {
      name: 'Lifeguard boat at North Bondi',
      file: 'bondi-lifeguard-boat.jpg'
    },
    {
      name: 'Stormy North Bondi jetty',
      file: 'stormy-north-bondi-jetty.jpg'
    },
    {
      name: 'Ben Buckler point',
      file: 'ben-buckler.jpg'
    },
    {
      name: 'Stormy Icebergs swimmer',
      file: 'stormy-icebergs-swimmer.jpg'
    }
  ]
};

function render() {
  var template = $('#template').html();
  var gallery = $('body').data('gallery');

  $.each(prints[gallery], function(index, value) {
    var item = $(template).clone();
    var buttonClass = 'paypal-button-container-' + index;

    $(item).find('#title').html(value.name);
    $(item).find('#photo').attr('src', '/img/categories/' + gallery + '/' + value.file);
    $(item).attr('data-name', value.name);
    $(item).find('#paypal-button-container').attr('class', buttonClass);
    $('#target').append(item);

    window.paypal.Button.render({
      env: window.location.hostname === 'scenicprints.com.au' ? 'production' : 'sandbox',
      style: {
        label: 'buynow',
        fundingicons: false,    // optional
        branding: true,         // optional
        size:  'medium',        // small | medium | large | responsive
        shape: 'rect',          // pill | rect
        color: 'blue'           // gold | blue | silve | black
      },
      client: {
        sandbox:    'AREO0PzSjZVakQTzU9R391z3FOTA8uXPy5zdSEP3e01rNwxZiz37Nq1-c-wRkvdUZAjpsNA1OO-OUCnM',
        production: 'ARjLNX4HcwiibVHUMVcPaze-4eMF0TQoFK5_3vbVMceBx5Z5BswNLgySm62_M_uPgunbESAXIYtBmDg8'
      },
      payment: function(data, actions) {
        return actions.payment.create({
          intent: "sale",
          transactions: [
            {
              amount: { total: '90', currency: 'AUD' },
              item_list: {
                items: [
                  {
                    name: value.name,
                    description: "Standard size",
                    quantity: "1",
                    price: "90",
                    currency: "AUD"
                  }
                ]
              }
            }
          ]
        });
      },
      onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(stuff) {
          console.log('DONE', stuff);
        });
      }
    }, '.' + buttonClass);
  });
}

$(function() {
  render();

  $('.toggle').click(function() {
    var body = $('body');

    if(body.hasClass('white-frame')) {
      body.removeClass('white-frame');
      body.addClass('black-frame');
    } else {
      body.removeClass('black-frame');
      body.addClass('white-frame');
    }
  });
});
