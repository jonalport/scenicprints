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

function getSize() {
  return $('body').attr('data-size');
}

function getFrame() {
  return $('body').attr('data-frame');
}

function getDescription() {
  var description = '';

  if (getFrame() === 'white') {
    description = 'White frame';
  } else {
    description = 'Black frame';
  }

  if (getSize() === 'standard') {
    description += ', 36 x 29cm.';
  } else {
    description += ', 57 x 47cm.';
  }

  return description;
}

function getPrice() {
  if (getSize() == 'standard') {
    return '100';
  } else {
    return '150';
  }
}

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
              amount: { total: getPrice(), currency: 'AUD' },
              item_list: {
                items: [
                  {
                    name: value.name,
                    description: getDescription(),
                    quantity: "1",
                    price: getPrice(),
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
  var body = $('body');

  $('.toggle').each(function() {
    var name = $(this).attr('data-val');
    var first = $(this).children().first();
    var value = first.attr('data-val');
    body.attr('data-' + name, value);
  })

  $('.toggle').click(function(event) {
    var name = $(this).attr('data-val');
    var value = $(event.target).attr('data-val');
    body.attr('data-' + name, value);
  });
});
