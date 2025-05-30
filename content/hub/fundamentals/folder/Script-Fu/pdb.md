---
title: Procedure Data-Base
type: docs
url: "/hub/fundamentals/folder/script-fu/pdb"
weight: 5
---

> **Note**: This content was copied from the [pdb README_NEW_PDB_PROC on GitLab] and may have changed upstream: https://gitlab.gnome.org/GNOME/gimp/-/blob/master/pdb/README_NEW_PDB_PROC

```md
Creating new PDB procedures
===========================
Barak Itkin <lightningismyname@gmail.com>
version 1.0, August 2010

////
This document is an asciidoc document. It can be read as is, or you can
print it as a formatted HTML page by running

    asciidoc README_NEW_PDB_PROC

This will generate the file README_NEW_PDB_PROC.html.

Note that inline code parts are marked with + signs around them.
////

This tutorial will show you the basics of creating a new procedure and
adding it to GIMP's PDB.

Introduction
------------

What are PDB procedures?
~~~~~~~~~~~~~~~~~~~~~~~~

A *PDB procedure* is a process which is registered in the Procedure
Data-Base. Procedures registered in the database are available to all
the GIMP plugins/scripts.

What should I want to add to the PDB?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Let's say a new feature was added to GIMP, and your plugin/script wants
to use it. In order to do so, this function should be publicly available
(most functions are only available to GIMP's core, and in order to
expose them externally we have to add them to the PDB).


Anything I should know before continuing this tutorial?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Yes. You should know
https://en.wikipedia.org/wiki/C_%28programming_language%29[C Programming]
(C is the language in which GIMP is coded), know a bit of
https://docs.gtk.org/glib/[Glib] (the library which
GIMP uses for many of it's data-structures). In addition, you should
know enough about the GIMP core for implementing your function (this is
not a programming tutorial, this is only a technical tutorial) or at
least have the intuition to understand enough from the code you see, to
copy paste and modify the parts you need (In fact, this is how I made my
first addition to the PDB :D However in most cases it's better to know
what you are doing).

The basics of PDB procedures
----------------------------

Since adding a function to the PDB can be tedious (you would need to
modify 3 or more different source files), a scripting framework was
developed to add functions to the PDB by writing them once. To see how
function are implemented in the PDB, take a look in
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/groups[pdb/groups].

You can see many files with the .pdb suffix - these are special template
files which include the actual source of the PDB functions. Let's take a
quick look at one of these - text_layer_get_text in
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/groups/text_layer.pdb[pdb/groups/text_layer.pdb].

[source,perl]
----
sub text_layer_get_text {
    $blurb = 'Get the text from a text layer as string.';

    $help = <<'HELP';
This procedure returns the text from a text layer as a string.
HELP

    &marcus_pdb_misc('2008', '2.6');

    @inargs = (
        { name => 'layer', type => 'layer',
          desc => 'The text layer' }
    );

    @outargs = (
        { name => 'text', type => 'string',
          desc => 'The text from the specified text layer.' }
    );

    %invoke = (
        code => <<'CODE'
{
  if (gimp_pdb_layer_is_text_layer (layer, FALSE, error))
    {
      g_object_get (gimp_text_layer_get_text (GIMP_TEXT_LAYER (layer)),
                    "text", &text,
                    NULL);
    }
  else
    {
      success = FALSE;
    }
}
CODE
    );
}
----

As you can see, all the function is wrapped inside the following wrapper:

[source,perl]
----
sub text_layer_get_text {
  ...
}
----

That's the first line, declaring the name of the new PDB function (it
will be renamed to +gimp_text_layer_get_text+ automatically), and
opening the braces for it's content.

Description of the procedure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

At the beginning of the PDB function, you'll find lines similar to these:

[source,perl]
----
    $blurb = 'Get the text from a text layer as string.';

    $help = <<'HELP';
This procedure returns the text from a text layer as a string.
HELP
----

Every procedure has a blurb string and a help string. A blurb is a short
string summarizing what the function does, and the help is a longer
string  in which you describe your function in more depth.

A one line string can be specified by simply putting it between braces
(like the blurb string). A longer string, which can possibly spread over
several lines, must be written in a special way:

[source,perl]
----
<<'HELP';
This procedure returns the text from a text layer as a string.
HELP
----

The +<<'*HELP*'+ practically mean that the content of the string will be
specified in the next lines and it will continue until reaching a line
which has the content +HELP+ in it (without any spaces before/after it,
and without anything else in that line).

Now, the next line is:

[source,perl]
----
     &marcus_pdb_misc('2008', '2.6');
----

If you contribute a function to the GIMP PDB, you credit yourself in the
source code. The above line is for an author which contributed many
functions and he now has a simple macro to credit him. For us regular
users, if we want to specify the credit to ourself we should replace the
above line with the following lines:

[source,perl]
----
    $author = 'Elvis Presley <the_king@rock.com>';
    $copyright = 'Elvis Presley';
    $date = '2010';
    $since = '2.8';
----

Replace the values of +$author+ and +$copyright+ with your own name and
email, replace the value of +$date+ with the date in which you wrote the
function (most functions only specify the year, so try to keep with this
standard instead of adding a full date). And finally, replace the value
of +$since+ with the version of GIMP which will be the first to include
this function. For example, if GIMP 2.6 was released, and 2.8 wasn't
released yet. then new functionality will be added in 2.8 (new
functionality is only added inside new major version releases) and you
should specify 2.8.

In and Out Arguments
~~~~~~~~~~~~~~~~~~~~
After the header of the function which contains it's description, you'll
find these lines:

[source,perl]
----
    @inargs = (
        { name => 'layer', type => 'layer',
          desc => 'The text layer' }
    );

    @outargs = (
        { name => 'text', type => 'string',
          desc => 'The text from the specified text layer.' }
    );
----

Here we specify the input arguments of this procedure, together with the
returned arguments. As you can see, each argument has a name, a type and
a description. The name will be used later in our code and it should be
meaningful and be a valid name for a variable in C.

The type is one of the types listed in
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/pdb.pl[pdb/pdb.pl]
inside the +%arg_types+ array. In
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/pdb.pl[pdb/pdb.pl]
you can see the corresponding C type for each of the types we specify.
For example, +layer+ type (inside the .pdb file) becomes a variable with
the C type of +GimpLayer *+, and +string+ becomes +gchar *+.

If I want to add another input variable to the function, it'll look like this:

[source,perl]
----
    @inargs = (
        { name => 'layer', type => 'layer',
          desc => 'The text layer' },
        { name => 'temp', type => 'int32',
          desc => 'My silly number' }
    );

    @outargs = (
        { name => 'text', type => 'string',
          desc => 'The text from the specified text layer.' }
    );
----

Don't forget to add comma between arguments!

The actual code
~~~~~~~~~~~~~~~

After specifying the arguments we will specify the actual code of the
function inside the following wrapper:

[source,perl]
----
    %invoke = (
        code => <<'CODE'

     ...

CODE
    );
----

Now finally, let's take a look at the actual code:

[source,c]
----
{
  if (gimp_pdb_layer_is_text_layer (layer, FALSE, error))
    {
      g_object_get (gimp_text_layer_get_text (GIMP_TEXT_LAYER (layer)),
                    "text", &text,
                    NULL);
    }
  else
    {
      success = FALSE;
    }
}
----

This is a simple code in C - nothing fancy. However, this code uses
functions from inside GIMP's core (hacking on the GIMP core will be the
content for a different guide). The variables +text+ and +layer+, inside
the C code, correspond to the variables we specified in the input/output
arguments (since they have exactly the same name):

[source,c]
----
    @inargs = (
        { name => 'layer', type => 'layer',
          desc => 'The text layer' }
    );

    @outargs = (
        { name => 'text', type => 'string',
          desc => 'The text from the specified text layer.' }
    );
----

If for some reason, our function can fail (for example, in the code
above the second line checks if the passed parameter is indeed a text
layer and not just any layer) then we should add an indication that it
failed by setting the variable +success+ to have the value +FALSE+.

Now, we need to do two more things to finish our function: add it to
the function list, and configure the includes correctly.

Registering the function inside the PDB file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

At the end of the PDB file, you should find the following segments:

[source,perl]
----
@headers = qw("libgimpbase/gimpbase.h"
              "core/gimpcontext.h"
              "text/gimptext.h"
              "text/gimptextlayer.h"
              "gimppdb-utils.h"
              "gimppdberror.h"
              "gimp-intl.h");

@procs = qw(text_layer_new
            text_layer_get_text
            text_layer_set_text
  ...
);
----

Inside the +@headers+ there is a list of various header files from the
gimp source. If your code requires a header which is not specified, add
it there.

Inside the +@procs+ there is a list of the procedures which are exported
by the file. *Make sure you add your procedure to the list!*

Advanced details
----------------

enum arguments
~~~~~~~~~~~~~~

In some cases you would like to have arguments which have a value from
an enum (enumeration). Instead of just declaring these as integer values
and telling in your description which value corresponds to which number,
this can be done automatically for you if the desired enum is one of the
enums which are already used by GIMP.

To make it clearer, let's take a look at +layer_get_mode+ in
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/groups/layer.pdb[pdb/groups/layer.pdb]:

[source,perl]
----
    @outargs = (
	{ name => 'mode', type => 'enum GimpLayerModeEffects',
	  desc => 'The layer combination mode' }
    );
----

If we take a look at the same procedure as it shows up in the procedure
browser (+gimp_layer_get_mode+), we will see the following return values:

[options="header",cols="1,1,11"]
|=======================================================================
|Name	|Type	|Description
|mode	|INT32	|
The layer combination mode { NORMAL-MODE (0), DISSOLVE-MODE (1),
BEHIND-MODE (2), MULTIPLY-MODE (3), SCREEN-MODE (4), OVERLAY-MODE (5),
DIFFERENCE-MODE (6), ADDITION-MODE (7), SUBTRACT-MODE (8),
DARKEN-ONLY-MODE (9), LIGHTEN-ONLY-MODE (10), HUE-MODE (11),
SATURATION-MODE (12), COLOR-MODE (13), VALUE-MODE (14),
DIVIDE-MODE (15), DODGE-MODE (16), BURN-MODE (17), HARDLIGHT-MODE (18),
SOFTLIGHT-MODE (19), GRAIN-EXTRACT-MODE (20), GRAIN-MERGE-MODE (21),
COLOR-ERASE-MODE (22), ERASE-MODE (23), REPLACE-MODE (24),
ANTI-ERASE-MODE (25) }
|=======================================================================

As you can see, all the values of the enum  were listed (the source file
containing this enum is
https://gitlab.gnome.org/GNOME/gimp/tree/master/app/base/base-enums.h[app/base/base-enums.h])
in it's description, and the type for this argument was declared as an
integer value (reminder: enumeration values in C are actually mapped to
numbers, unlike languages such as Java where enumeration values are
indeed a new type in the language).

Limiting the range of numerical arguments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In some cases you would like to limit the range of numerical values
passed as parameters for your PDB function. For example, the width of
newly created images should be limited to be at least 1 (since images
with 0 width don't make sense...) and it also should be limited to some
maximal width (so that it won't be bigger than the maximal size GIMP
supports).

We can add this sort of range limitations inside the declaration of the
function, and by that we can make sure it won't be called with values
out of range (GIMP will make sure the values are inside the specified
range before it calls our function). To see an example, let's take look
at the procedure image_new from
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/groups/image.pdb[pdb/groups/image.pdb]:

[source,perl]
----
    @inargs = (
    { name => 'width', type => '1 <= int32 <= GIMP_MAX_IMAGE_SIZE',
      desc => 'The width of the image' },
    { name => 'height', type => '1 <= int32 <= GIMP_MAX_IMAGE_SIZE',
      desc => 'The height of the image' },
    { name => 'type', type => 'enum GimpImageBaseType',
      desc => 'The type of image' }
    );
----

As you can see, inside the +*type*+ field of the first two parameters,
we added a limitation on the range of the parameter. The lower
limitation is a simple number, and the upper limitation is a constant
macro (+GIMP_MAX_IMAGE_SIZE+) defined in
https://gitlab.gnome.org/GNOME/gimp/tree/master/libgimpbase/gimplimits.h[libgimpbase/gimplimits.h].
In order to make sure this constand will indeed be defined when parsing
this function, the file
https://gitlab.gnome.org/GNOME/gimp/tree/master/libgimpbase/gimpbase.h[libgimpbase/gimpbase.h]
(which includes
https://gitlab.gnome.org/GNOME/gimp/tree/master/libgimpbase/gimplimits.h[libgimpbase/gimplimits.h])
was added to the +@headers+ section of the pdb file.

Now, if you take a look at the code part of this function you won't see
any check that the value is indeed inside the specified range. As we
said, GIMP takes care of this automatically for us so we don't need to
add the check ourselves. Inside the procedure browser, this procedure
would show up like this:

[options="header",cols="1,1,11"]
|=======================================================================
|Name	|Type	|Description
|width	|INT32	|The width of the image (1 \<= width \<= 262144)
|height	|INT32	|The height of the image (1 \<= height \<= 262144)
|type	|INT32	|The type of image { RGB (0), GRAY (1), INDEXED (2) }
|=======================================================================

Array arguments
~~~~~~~~~~~~~~~
In some cases you will want a function which returns an array or a
function which receives an array. Array arguments are specified in a
special way which is a bit different than the other arguments. To see
how array arguments are specified, let's take a look at the +@outargs+
of +path_stroke_get_points+ from
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/groups/path.pdb[pdb/groups/path.pdb]:

[source,perl]
----
    @outargs = (
        { name => 'type', type => 'enum GimpPathStrokeType',
          desc => 'type of the stroke (always GIMP_PATH_STROKE_TYPE_BEZIER for now).' },
        { name => 'controlpoints', type => 'floatarray',
          desc => 'List of the control points for the stroke (x0, y0, x1, y1, ...).',
          array => { name => 'num_points',
                     desc => 'The number of floats returned.' } },
        { name => 'closed', type => 'boolean',
          desc => 'Whether the stroke is closed or not.' }
    );
----

As you can see, the second argument which is of type +floatarray+ is
specified in a different way than the other arguments; In addition to
+name+, +type+ and +desc+, it also has an +*array*+  part. This part
will declare another parameter for this function which will hold the
length of the array (Reminder: in C you need the length of an array
since unlike languages such as python, the length of an array isn't kept
by default).

As a result of this declaration, two arguments will be created (in this
order):

--
. +*num_points*+ - a parameter of type +gint32+ which will hold the
length of the array.
. +*controlpoints*+ - a parameter of type +gdouble*+ which will point to
the first element in the array.
--

Like all the other arguments which are declared in the +@outargs+ and
+@intargs+ parts, their name  value will be the name of the variable in
the code part. If you'll look at the code part of this function,
you'll be able to find these lines:

[source,c]
----
          num_points = points_array->len;
          controlpoints = g_new (gdouble, num_points * 2);
----
As you can see from the code above, the +controlpoints+ argument starts
just as a pointer to a double (array) - you have to do the allocation of
the array yourself. However, if we would specify an array as an input
argument, then the pointer will point to its beginning.

Summary
-------

Hey! Now what - how do I see my function?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Compile GIMP again from the source, and pass the flag --with-pdbgen to
the configure script (or to the autogen script if using the autogen
script).

Conclusions
~~~~~~~~~~~
Now that you know how a PDB function looks like, you should be able to
add new ones of your own if GIMP needs them (ask on the development list
before working on a new function like this, since you need to see if the
developers agree that it's needed!).

Don't forget to include the functions inside the right files! Under
https://gitlab.gnome.org/GNOME/gimp/tree/master/pdb/groups[pdb/groups]
you can see many files (fonts.pdb, brush.pdb, layer.pdb, etc.) - *make
sure you add your function in the place which logically suites it!*
```