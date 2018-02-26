var prints = {
  'bondi-beach': [
    {
      name: 'Diagonal dippers',
      file: 'diagonal-dippers.jpg'
    },
    {
      name: 'Azure dips',
      file: 'azure-dips.jpg'
    },
    {
      name: 'Coming & going',
      file: 'vertical-swimmers-bondi.jpg'
    },
    {
      name: 'Tiny Bondi people',
      file: 'tiny-bondi-people.jpg'
    },
    {
      name: 'Tidal pools',
      file: 'tidal-pools.jpg'
    },
    {
      name: 'Ben Buckler point',
      file: 'ben-buckler.jpg'
    },
    {
      name: 'Lifeguard boat at North Bondi',
      file: 'bondi-lifeguard-boat.jpg'
    },
    {
      name: 'Stormy North Bondi jetty',
      file: 'stormy-north-bondi-jetty.jpg'
    },
    {
      name: 'Lonely Icebergs swimmer',
      file: 'lonely-icebergs-swimmer.jpg'
    }
  ],
  sydney: [
    {
      name: 'North Tamarama',
      file: 'north-tama.jpg'
    },
    {
      name: 'Mona Vale pool',
      file: 'mona-vale-pool.jpg'
    },
    {
      name: 'Surfers at Mackenzies Bay',
      file: 'surfers-mackenzies-bay.jpg'
    },
    {
      name: 'Walkers at Rose Bay dog beach',
      file: 'walkers-rose-bay-dog-beach.jpg'
    },
    {
      name: 'Bronte to Maroubra',
      file: 'bronte-maroubra.jpg'
    },
    {
      name: 'Bronte pool',
      file: 'bronte-pool.jpg'
    }
  ],
  'all-over': [
    {
      name: 'Swimmers, Zakynthos',
      file: 'swimmers-zakynthos.jpg'
    },
    {
      name: 'Montepulciano',
      file: 'montepulciano.jpg'
    },
    {
      name: 'Kayakers at Roaring Meg',
      file: 'kayakers-roaring-meg.jpg'
    },
    {
      name: 'Lake Benmore',
      file: 'lake-benmore.jpg'
    },
    {
      name: 'Shotover jet-boat',
      file: 'shotover-jet-boat.jpg'
    },
    {
      name: 'Avignonesi wine farm',
      file: 'avignonesi-wine-farm.jpg'
    }
  ]
};

window.onload = function() {
  if (window.location.hash) {
    $('html, body').animate({
      scrollTop: $(window.location.hash).offset().top
    }, 800);
  }
}

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
    var baseClass = 'paypal-button-container';
    var buttonClass = baseClass + '-' + index;

    $(item).find('#title').html(value.name);
    $(item).find('#photo').attr('src', '/img/categories/' + gallery + '/' + value.file);
    $(item).attr('data-name', value.name);
    $(item).attr('id', value.file.split('.')[0]);
    $(item).find('#paypal-button-container').addClass(baseClass).addClass(buttonClass).removeAttr('id');
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
          intent: 'sale',
          transactions: [
            {
              amount: { total: getPrice(), currency: 'AUD' },
              item_list: {
                items: [
                  {
                    name: value.name,
                    description: getDescription(),
                    quantity: '1',
                    price: getPrice(),
                    currency: 'AUD'
                  }
                ]
              }
            }
          ]
        });
      },
      onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(stuff) {
          $('body').prepend('<div class="thanks"><div class="thanks__heading">Thanks, ' + stuff.payer.payer_info.first_name + '!</div><div class="thanks__body">We will be in touch soon with information about your delivery.</div></div>');
          $('html, body').animate({ scrollTop: 0 }, 0);
        });
      }
    }, '.' + buttonClass);
  });
}

$(function() {
  render();
  var body = $('body');

  $.preloadImages = function() {
    for (var i = 0; i < arguments.length; i++) {
      $('<img />').attr('src', arguments[i]);
    }
  }

  $.preloadImages('/img/frames/black_frame.png', '/img/frames/white_frame.png');

  $('.toggle').each(function() {
    var name = $(this).attr('data-val');
    var first = $(this).children().first();
    var value = first.attr('data-val');
    body.attr('data-' + name, value);
  })

  $('.toggle span').click(function(event) {
    var name = $(this).closest('.toggle').attr('data-val');
    var value = $(this).attr('data-val');
    body.attr('data-' + name, value);
  });
});
