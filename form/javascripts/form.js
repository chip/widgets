var Form = new Class({
  Implements: Events,
  initialize: function(options) {
    var me = this;
    var form = this.form = $(options.id);
    (function() { form.focusFirst(true); }).delay(500);
    form.addEvent('submit', function() {
      if (form.get('submitted')) return false;
      form.set('submitted', true);
      new Request.HTML({
        url: form.getProperty('action'),
        method: 'post',
        evalScripts: false,
        onComplete: function(tree, elements, html, js) {
          me.fireEvent('complete', [ elements ? elements[0] : null, js ]);
        }
      }).send(form.toQueryString());
      return false;
    });
  }
});