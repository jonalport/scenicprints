var prints = {
  'bondi-beach': [
    {
      artist: 'Isabella Dobozy',
      url: 'https://www.isabelladobozyphoto.com/',
      name: 'Bondi board training',
      file: 'bondi-board-training.jpg'
    },
    {
      artist: 'Isabella Dobozy',
      url: 'https://www.isabelladobozyphoto.com/',
      name: 'Bergs morning',
      file: 'bergs-morning.jpg'
    },
    {
      artist: 'Isabella Dobozy',
      url: 'https://www.isabelladobozyphoto.com/',
      name: 'One wave is all it takes',
      file: 'one-wave-is-all-it-takes.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Diagonal dippers',
      file: 'diagonal-dippers.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Azure dips',
      file: 'azure-dips.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Coming & going',
      file: 'vertical-swimmers-bondi.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Tiny Bondi people',
      file: 'tiny-bondi-people.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Tidal pools',
      file: 'tidal-pools.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Ben Buckler point',
      file: 'ben-buckler.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Lifeguard boat at North Bondi',
      file: 'bondi-lifeguard-boat.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Stormy North Bondi jetty',
      file: 'stormy-north-bondi-jetty.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Lonely Icebergs swimmer',
      file: 'lonely-icebergs-swimmer.jpg'
    }
  ],
  sydney: [
    {
      artist: 'Isabella Dobozy',
      url: 'https://www.isabelladobozyphoto.com/',
      name: 'Summer at the Bogey Hole',
      file: 'summer-at-the-bogey-hole.jpg'
    },
    {
      artist: 'Isabella Dobozy',
      url: 'https://www.isabelladobozyphoto.com/',
      name: 'DaFin',
      file: 'dafin.jpg'
    },
    {
      artist: 'Isabella Dobozy',
      url: 'https://www.isabelladobozyphoto.com/',
      name: 'Asymmetrical Clovelly',
      file: 'asymmetrical-clovelly.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'North Tamarama',
      file: 'north-tama.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Mona Vale pool',
      file: 'mona-vale-pool.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Surfers at Mackenzies Bay',
      file: 'surfers-mackenzies-bay.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Walkers at Rose Bay dog beach',
      file: 'walkers-rose-bay-dog-beach.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Bronte to Maroubra',
      file: 'bronte-maroubra.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Bronte pool',
      file: 'bronte-pool.jpg'
    }
  ],
  'all-over': [
    {
      artist: 'Isabella Dobozy',
      url: 'https://www.isabelladobozyphoto.com/',
      name: 'Cookies & cream',
      file: 'cookies-and-cream.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Swimmers, Zakynthos',
      file: 'swimmers-zakynthos.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Montepulciano',
      file: 'montepulciano.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Kayakers at Roaring Meg',
      file: 'kayakers-roaring-meg.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Lake Benmore',
      file: 'lake-benmore.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
      name: 'Shotover jet-boat',
      file: 'shotover-jet-boat.jpg'
    },
    {
      artist: 'Jon Alport',
      url: '',
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

    var subtitle = value.artist;

    if (value.url) {
      subtitle = "<a title=\"Visit " + value.artist + "'s website\" href=\"" + value.url + "\">" + value.artist + "</a>";
    }

    $(item).find('#subtitle').html('By ' + subtitle);
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
                    artist: 'Jon Alport',
                    url: '',
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
